#!/usr/bin/env python3
"""Functional checks of expedition controls through Chrome DevTools CLI."""
import argparse, json, pathlib, re, subprocess
p=argparse.ArgumentParser();p.add_argument('--page',default='2');a=p.parse_args()
cli=['npx','--yes','--package','chrome-devtools-mcp','chrome-devtools']
def run(*args):
 return subprocess.run(cli+list(args),capture_output=True,text=True,check=True).stdout
def js(code):
 raw=run('evaluate_script',code,'--pageId',a.page)
 return json.loads(re.search(r'```json\s*([\s\S]*?)\s*```',raw).group(1))
run('emulate',a.page,'--viewport','1600x900')
run('navigate_page',a.page,'--type','reload')
issues=js('''() => {const errors=[];const buttons=[...document.querySelectorAll('.era-stop')];if(buttons.length!==10)errors.push('not ten stops');for(const b of buttons){b.click();let dest=SLIDES.findIndex(s=>s.era===b.dataset.era);if(dest<0||document.querySelector('.slide.is-active').dataset.id!==SLIDES[dest]?.id||b.getAttribute('aria-current')!=='step')errors.push('stop '+b.dataset.era);}const range=document.querySelector('#slide-position');for(const n of [1,Math.round(SLIDES.length/2),SLIDES.length]){range.value=n;range.dispatchEvent(new Event('input',{bubbles:true}));if(document.querySelector('.slide.is-active').dataset.id!==SLIDES[n-1].id)errors.push('range '+n);}range.value=1;range.dispatchEvent(new Event('input',{bubbles:true}));range.focus();return errors;}''')
run('press_key',a.page,'ArrowRight')
if not js("() => document.querySelector('.slide.is-active').dataset.id === SLIDES[1].id && document.querySelector('.slide.is-active').dataset.now === '0'"):
 issues.append('native range ArrowRight did not move exactly one slide')
run('press_key',a.page,'End')
if not js("() => document.querySelector('.slide.is-active').dataset.id===SLIDES.at(-1).id"):
 issues.append('native range End')
run('press_key',a.page,'Escape')
run('press_key',a.page,'Home')
run('press_key',a.page,'n')
if not js("() => {const stage=document.querySelector('.deck').getBoundingClientRect(),nav=document.querySelector('.expedition').getBoundingClientRect(),notes=document.querySelector('.notes').getBoundingClientRect();return stage.bottom<=nav.top+1&&nav.bottom<=notes.top+1&&document.querySelector('.notes').textContent.includes('ŘÍCT:')}"):
 issues.append('notes or timeline overlap, or missing notes')
run('press_key',a.page,'n')
run('press_key',a.page,'o')
if not js("() => getComputedStyle(document.querySelector('.expedition')).display==='none' && [...document.querySelectorAll('.slide')].every(s=>getComputedStyle(s).display!=='none')"):
 issues.append('overview')
run('press_key',a.page,'Escape')
run('emulate',a.page,'--viewport','390x844')
issues += js('''() => {let errors=[];for(const b of document.querySelectorAll('.era-stop')){b.click();const r=b.getBoundingClientRect();if(r.left<0||r.right>innerWidth)errors.push('mobile current stop not visible '+b.dataset.era);}const stage=document.querySelector('.deck').getBoundingClientRect(),nav=document.querySelector('.expedition').getBoundingClientRect();if(stage.left< -1||stage.right>innerWidth+1||stage.bottom>nav.top+1)errors.push('mobile stage');return errors;}''')
run('emulate',a.page,'--viewport','1600x900')
js("() => {document.activeElement.blur();return true;}")
run('press_key',a.page,'Home')
result={'issues':issues,'checks':['10 era buttons','range endpoints and middle','native keyboard range navigation','notes geometry','overview','mobile stop scrolling and stage']}
out=pathlib.Path(__file__).resolve().parents[1]/'html/review/archaeology/navigation.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(result,ensure_ascii=False,indent=2))
print(json.dumps(result,ensure_ascii=False,indent=2))
raise SystemExit(bool(issues))
