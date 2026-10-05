#!/usr/bin/env python3
"""Offline browser QA using chrome-devtools CLI; saves screenshots and a JSON report.
Run: python3 scripts/review-html.py --page 2 [--all-states] [--output html/review/narrative]
Chrome DevTools page must already contain html/index.html.
"""
import argparse,json,pathlib,re,subprocess
p=argparse.ArgumentParser();p.add_argument('--page',default='2');p.add_argument('--all-states',action='store_true');p.add_argument('--output',default='html/review/narrative');a=p.parse_args()
root=pathlib.Path(__file__).resolve().parents[1];out=root/a.output;out.mkdir(parents=True,exist_ok=True)
cli=['npx','--yes','--package','chrome-devtools-mcp','chrome-devtools']
def run(*args):
 r=subprocess.run(cli+list(args),capture_output=True,text=True,check=True)
 return r.stdout
def js(code):
 raw=run('evaluate_script',code,'--pageId',a.page)
 m=re.search(r'```json\s*([\s\S]*?)\s*```',raw)
 if not m:raise RuntimeError(raw)
 return json.loads(m.group(1))
run('emulate',a.page,'--viewport','1600x900')
run('navigate_page',a.page,'--type','reload')
meta=js('''() => {let st=document.createElement('style');st.textContent='*,*::before,*::after{transition:none!important;animation:none!important}';document.head.append(st);return SLIDES.map((s,i)=>{let el=document.querySelectorAll('.slide')[i];return {id:s.id,index:i+1,max:Math.max(0,...[...el.querySelectorAll('[data-step],[data-until],[data-on]')].map(n=>Math.max(+(n.dataset.step||0),+(n.dataset.until||0),+(n.dataset.on||0)))),notes:NOTES[s.id]||''}});}''')
report={'slides':len(meta),'states':0,'issues':[],'timingSeconds':0}
for s in meta:
 times=re.findall(r'⏱\s*(\d+):(\d+)',s['notes']);report['timingSeconds']+=sum(int(m)*60+int(sec) for m,sec in times)
 for label in ['ŘÍCT:','POINTA:','PŘECHOD:']:
  if label not in s['notes']:report['issues'].append({'slide':s['id'],'missingNote':label})
 for step in range(s['max']+1):
  result=js('''async () => {location.hash='#/%d/%d';await new Promise(r=>setTimeout(r,25));let el=document.querySelector('.slide.is-active'),b=el.getBoundingClientRect();let issues=[];for(let n of el.querySelectorAll('[data-step],[data-until]')){let hide=(n.dataset.step && %d<+n.dataset.step)||(n.dataset.until && %d>=+n.dataset.until);if(n.classList.contains('is-hidden')!==!!hide)issues.push('build:'+n.textContent.slice(0,50));}for(let n of el.querySelectorAll('h1,h2,p,pre,text,.box,.tok,figure,img')){let r=n.getBoundingClientRect();if(getComputedStyle(n).visibility!=='hidden'&&r.width&&(r.left<b.left-2||r.top<b.top-2||r.right>b.right+2||r.bottom>b.bottom+2))issues.push('overflow:'+n.textContent.slice(0,80));}return {id:el.dataset.id,issues};}'''%(s['index'],step,step,step))
  report['states']+=1
  if result['id']!=s['id']:result['issues'].append('wrong active slide')
  if result['issues']:report['issues'].append({'slide':s['id'],'step':step,**result})
  if a.all_states or step==s['max']:
   run('take_screenshot',a.page,'--filePath',str(out/f"{s['index']:02d}-{s['id']}-{step}.png"))
 print(s['index'],s['id'],flush=True)
report['console']=run('list_console_messages',a.page)
# Filter in DevTools and read structured data: ordinary logs/warnings must not fail QA.
console_errors=json.loads(run('list_console_messages',a.page,'--types','error','--output-format','json')).get('consoleMessages',[])
for error in console_errors:
 report['issues'].append({'consoleError':error['text'],'consoleMessageId':error['id']})
(out/'report.json').write_text(json.dumps(report,indent=2,ensure_ascii=False))
print(json.dumps(report,indent=2,ensure_ascii=False))

raise SystemExit(1 if report['issues'] else 0)
