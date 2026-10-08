// English speaker notes per slide id (translated from ../notes.js; ids and timings unchanged).
// SAY = short spoken lines; nuance goes to TECHNICAL NOTE.
// Builds within one slide are separated by '— next step —'. Times sum to 29:00 (+1:00 reserve).
window.NOTES = {
  "dont-panic": `⏱ 0:45

SAY:
The Hitchhiker's Guide to LLMs. My name is Pavel Lorenz.
AI Monday number seventeen. Will we be destroyed by Terminators, or by transformers? A small hint: the T in GPT stands for Transformer. We'll come back to that question honestly at the end.

POINT: What we fear most is what we don't understand.

TRANSITION: So who is actually telling you all this?`,

  "o-mne": `⏱ 0:45

SAY:
I work as a staff engineer at Heureka Group, and I'm mostly a practitioner. I deal with AI every single day. What interests me is what actually works in practice.

— next step —

And ever since I was a kid, I've taken apart things I didn't understand. Most of them never worked again afterwards. But I always learned something.

POINT: A practitioner's view, not a researcher's.

TRANSITION: So I took this apart too.`,

  "motivace": `⏱ 1:00

SAY:
Will it destroy us? Will it replace us? You read these headlines too. Before I start to worry, I want to know what's inside. So I started digging. At the top: today's assistants, GPT and ChatGPT.

— next step —

Along the way I also ran into BERT and rerankers. Useful side branches.

— next step —

And all the way down, the foundations: Shannon and Markov.

— next step —

I haven't studied this for decades. I'm a practitioner who looks up what actually showed up here. But that view helps anyone who plays with AI.

POINT: Fear of the unknown → look inside.

EXTRA / IF ASKED:
(Do not read in full during the talk.)
GPT = Generative Pre-trained Transformer: a generative, pre-trained model with the Transformer architecture. The basic game: "The cat sits on the …" → what comes next?
BERT = Bidirectional Encoder Representations from Transformers. Bidirectional means it looks both ways. One of its main training games: "The cat sits on the [MASK] and watches the street." → what fills the gap? It sees context on the left and on the right. Both sentences are our illustrations.
Short version out loud: "GPT learned to continue text. BERT learned to fill holes in text while also seeing what comes after them. Two different training games on related technology."
BERT can be the basis of a classifier, of extracting an answer from a document, or of a reranker. A reranker re-scores retrieved results by their relevance to the query.

TECHNICAL NOTE: The three layers are a map of the talk, not a genealogy: BERT (S25) and rerankers are side branches, not predecessors of GPT. In basic autoregressive training GPT predicts the next token from the preceding text; the original BERT uses masked language modeling plus next sentence prediction. The original BERT is not a typical autoregressive chatbot; GPT, on the other hand, can also classify. The difference in training tasks is not a strict split of possible applications. A pre-trained GPT is not automatically an assistant yet.

SOURCE: BERT (S25); GPT 2018 (S26).

TRANSITION: So let's start from the beginning.`,

  "back-to-roots": `⏱ 0:30

SAY:
Back to the roots. Ten stops. At each one: what problem they were solving, what they improved, and what new limit they hit.

POINT: A story of limits, not a list of names.

TRANSITION: The year 1913.`,

  "markov": `⏱ 0:45

SAY:
1913, Andrey Markov, a Russian mathematician. He took twenty thousand letters of Eugene Onegin.

— next step —

He marked every letter: vowel or consonant. And he counted how often each pair followed one another.

— next step —

And the result? After a vowel, another vowel followed in about 13 percent of cases. After a consonant, in about 66 percent. If we know what came before, we can better guess what comes next. And we still know nothing about the meaning of the story.

POINT: The root of the idea "the next symbol depends on the previous one".

EXTRA / IF ASKED:
Andrey Andreyevich Markov (1856–1922), a mathematician working in St. Petersburg. He studied probability and dependent random events; that's where Markov chains come from.
Yes, he published it: the 1913 paper is available in English translation as An Example of Statistical Investigation of the Text Eugene Onegin Concerning the Connection of Samples in Chains (Science in Context, 2006).

TECHNICAL NOTE: Say "the letters are not statistically independent", not "it isn't random". Even a random process can have dependencies. Markov had been developing the theory of dependent sequences since 1906; Onegin was an empirical example, not the invention of a language model nor proof of understanding language. The values 0.128 and 0.663 are rounded results for his analysed sample (S17, Link, p. 335), not a universal property of languages. The letters on the slide are our illustration in Latin script, not Markov's original data.

SOURCE: Markov 1913 (S17).

TRANSITION: 35 years later, someone took this seriously for language as a whole.`,

  "kocka": `⏱ 1:15

SAY:
Say nothing. Let the room fill in the blank. Wait 3–4 seconds.

— next step —

Roof, couch, floor… Nobody knew the "right" one. But everybody knew what was likely.

— next step —

Congratulations, you just were a language model. It's the autocomplete on your phone. Just a very big one.

POINT: A language model estimates what comes next.

TRANSITION: Claude Shannon was already playing this game in 1951.`,

  "shannon": `⏱ 1:00

SAY:
In 1951, Claude Shannon was playing essentially the same game we just played.

— next step —

People got the beginning of a text and guessed the next letter. In this illustration, the number tells you on which attempt the person got it right. Often on the very first try.

— next step —

The same game as with the cat, just letter by letter. Shannon used it to find out how much uncertainty is left in the next letter once we know the context. Language has regularities, and we can measure their consequences. But here, a human was doing the guessing.

(Optional, 10 s:) Claude Shannon. That name might remind you of something. WIRED writes that the name Claude can also be read as a nod to him.

POINT: "Guess what comes next" is an idea that is decades old.

EXTRA / IF ASKED:
Yes, two key publications:
1948 — A Mathematical Theory of Communication: the foundations of information theory, including statistical approximations of English. From random characters, through letter frequencies, to sequences of characters and words. The text gradually looks more and more like language.
1951 — Prediction and Entropy of Printed English: people guess the next letter; from that Shannon estimates the entropy and redundancy of English.
Are these already language models? We can see the 1948 statistical generators as simple language models. You don't need a neural network for that. On this slide, though, we show the principle of the 1951 human experiment.

TECHNICAL NOTE: The row with the number of attempts is our Czech illustration of the principle (the slide keeps the Czech sentence and labels it), not Shannon's data (the experiment was in English, 1951, Prediction and Entropy of Printed English; 1948 A Mathematical Theory of Communication: approximations of language of various orders). Markov 1913 = an analysis of the sequential dependence of vowels/consonants, not "the invention of a language model". The idea was not "on ice": it was gradually used and improved. Claude callback: according to WIRED (Levy 2025) the name expresses familiarity and warmth and, depending on whom you ask, also a nod to Shannon — it is not a definitive origin of the name, say it only as a joke.

SOURCE: Markov 1913 (S17); Shannon 1948, 1951 (S18); WIRED 2025 (S24).

TRANSITION: How do we turn this into a machine? First, simply by counting.`,

  "ngramy": `⏱ 1:30

SAY:
We can't have a reliable table for every whole sentence: most long contexts we'll never see. So we keep only the last few words. We take a pile of text and count what follows "sits on the". Roof fifty times, couch twenty times. That gives us a distribution. The previous words determine the guess for the next one — that's an n-gram. The same loop as today, only the probabilities come from a table.

— next step —

The problem: if I want a longer history including the cat, the table knows "cat sits on the roof", but it has never seen "kitten sits on the roof". For the table, cat and kitten are two unrelated columns.

— next step —

People solved this cleverly: if I don't know the longer context, I try a shorter one. Backoff.

— next step —

This worked for decades, for example in speech recognition. Frederick Jelinek and his team at IBM belong in this story: they combined what matches the sound with how likely a sequence of words is. The limit of the basic table: similar words don't share statistics on their own.

POINT: N-grams: the right principle, but a basic word table doesn't share similarity between words.

EXTRA / IF ASKED:
(Optional, about 30–45 s.)
An n-gram is itself a language model. It is not a substitute for "an LM that couldn't be computed". It's a practical simplification: instead of the whole history we use the last N−1 words. Unigram: no previous word. Bigram: one. Trigram: two.
It's not just about computing power. Mainly, we don't have enough examples for all long contexts. Shorter contexts show up more often, so we can estimate their probabilities better. We already see the principle in Shannon's approximations; the 70s–90s on the timeline mark practical use, not the invention.
Frederick (Bedřich) Jelinek (1932–2010), a Czech-born scientist, led the IBM research group from 1972 to 1993. He did not invent n-grams. He helped establish and develop statistical methods in practical speech recognition.
Our illustration: "write" and "right" sound the same. The sound doesn't decide the spelling; context helps: "write a letter", but "turn right". A recognizer combines the match with the sound and the probability of the word sequence.
Publication: Frederick Jelinek, Continuous Speech Recognition by Statistical Methods, Proceedings of the IEEE, 1976.

TECHNICAL NOTE: N-gram = a sequence of N words; a trigram predicts from the 2 previous words. Combinatorial explosion: a vocabulary of 100,000 words → 10^10 bigrams, 10^15 trigrams; most of them we'll never see (sparsity), so just increasing N doesn't help. Smoothing and backoff were mature techniques (comparison: Chen & Goodman 1996); statistical speech recognition (IBM, Jelinek, 1970s). Don't present it as a primitive dead end. "Cat ≠ kitten" holds for the basic word model; class-based n-grams partly addressed word similarity. Counts on the slide are illustrative: 50/20/10 from a corpus with three continuations = 62.5 / 25 / 12.5 %. Combinatorial explosion = the theoretical number of possibilities, not necessarily the allocated size of a table.

SOURCE: Jelinek 1976, Chen & Goodman 1996 (S19).

TRANSITION: A distribution follows directly from the counts.`,

  "rozdeleni": `⏱ 0:45

SAY:
The model doesn't return an answer. It returns a distribution: how likely each possible next token is.

— next step —

From the counts on the previous slide: 50 out of 80 is 62.5 %, 20 out of 80 is 25 %, 10 out of 80 is 12.5 %. That's a distribution. Today's models inherited this principle.

POINT: The output is a probability distribution over the next token.

TECHNICAL NOTE: An illustrative corpus with three continuations; a real n-gram model would also smooth and leave some probability for unseen words. Today's models compute scores (logits) and a softmax, not counts, but the output is still a distribution. Probability ≠ certainty of truth.

JOKE: Even a high probability is not a stamp of truth.

TRANSITION: But to the table, cat and kitten are strangers.`,

  "bengio": `⏱ 0:45

SAY:
2003, Bengio and colleagues. What if cat and kitten weren't two columns? Every word gets a learned position. The network can learn that cat and kitten are used in similar ways, and handle combinations it has never seen. Car is somewhere else.

— next step —

The limit: the context window is still fixed, and training was expensive back then.

POINT: From a table of counts to a learned representation of language.

EXTRA / IF ASKED:
Yoshua Bengio: a pioneer of deep learning at Université de Montréal; together with Hinton and LeCun he received the Turing Award for 2018.
This is about A Neural Probabilistic Language Model (2003), with Ducharme, Vincent and Jauvin. It jointly learns numerical representations of words and next-word prediction. Because regularities are shared between similar words, the model can better estimate combinations it hasn't seen. It has a fixed window; it is not an RNN.
Don't confuse it with Learning Long-Term Dependencies with Gradient Descent Is Difficult (Bengio, Simard, Frasconi, 1994). That paper does not say "recurrent networks don't work". It shows why ordinary gradient learning struggles to learn long dependencies: the correction signal can fade over many steps (vanishing gradient).

TECHNICAL NOTE: The picture is a schematic 2D similarity, not a measurement. Bengio 2003 learns word vectors and probabilities jointly; a fixed window of N previous words; computational cost is an explicit topic of the paper.

SOURCE: Bengio et al. 2003 (S20); Bengio, Simard, Frasconi 1994: https://doi.org/10.1109/72.279181; Turing Award: https://awards.acm.org/binaries/content/assets/press-releases/2019/march/turing-award-2018.pdf

TRANSITION: How do we get rid of the fixed window?`,

  "mikolov": `⏱ 0:45

SAY:
2010, Tomáš Mikolov and colleagues. A recurrent network carries the history of the text in its state. No fixed window. By the way, a pretty important part of this story happened in Brno, in the Czech Republic.

— next step —

The limit: it computes step by step, and long dependencies are hard to learn.

POINT: A state instead of a fixed window.

EXTRA / OPTIONAL STORY:
(About 25 s.)
"And now Brno. Tomáš Mikolov experiments with recurrent networks, even though people around him say they can't really be trained. He gets them working and gets results so good that some people don't believe him. So he publishes the code: check it yourselves."
JELINEK CALLBACK:
(About 10 s.) "And here our stops connect in person: in 2010 Tomáš was on an internship at Johns Hopkins, working partly under Frederick Jelinek — the one from statistical speech recognition."
Support: the supervisor's statement confirms a six-month internship in 2010 under Fred Jelinek and Sanjeev Khudanpur (S27).

Timeline: 2010 the RNNLM paper and the toolkit release; 2012 PhD at Brno University of Technology and joining Google Brain; 2013 word2vec with colleagues at Google. So the RNNLM toolkit was not created later because of distrust at Google.

TECHNICAL CLARIFICATION OF THE STORY: Mikolov describes the scepticism around him and his early unawareness of the gradient problems in his own recollections (S27). That does not support a literal "he hadn't read Bengio" or "the whole world misread the paper". Bengio 1994 described the difficulty of learning long dependencies, not that working RNNs were impossible. Mikolov later collaborated with Bengio on this very topic. Don't say he couldn't succeed in the Czech Republic: a key part of the work was done at Brno University of Technology in collaboration with JHU; specific dismissive reactions are not evidence of why he emigrated.

TECHNICAL NOTE: Mikolov, Karafiát, Burget, Černocký, Khudanpur (Interspeech 2010; Brno University of Technology + JHU). RNN state ≠ guaranteed unlimited memory; vanishing/exploding gradients. LSTM (1997, S23) existed earlier, just a nuance. Don't say Mikolov invented LLMs.

SOURCE: Mikolov et al. 2010 (S21); Hochreiter & Schmidhuber 1997 (S23); Mikolov interviews (S27).

TRANSITION: And then a side branch.`,

  "word2vec": `⏱ 0:45

SAY:
2013, word2vec. Mikolov and colleagues, this time at Google. This is not about generating text. It's about cheaply learning good word vectors from their neighbourhood in a huge corpus.

— next step —

The famous example: king minus man plus woman lands close to queen. It works approximately, not always.

— next step —

The limit: one word, one vector, regardless of context. And it doesn't produce text by itself.

POINT: A side branch that showed how much structure there is in word vectors.

EXTRA / OPTIONAL CALLBACK:
(About 15 s.)
"At Google he and his colleagues then create word2vec — a fast way to learn word vectors. And once again it helps to put something into other people's hands that they can run. A paper wasn't enough. Working software helped."
According to Mikolov's recollection, he had to push for releasing the code: Google initially saw it as a competitive advantage. After the release in 2013, interest grew significantly. Keep this separate from the 2010 RNNLM toolkit; these are two stages. Present colleagues' attitudes and the approval process as his personal account (S27).

TECHNICAL NOTE: CBOW and Skip-gram (arXiv 1301.3781), negative sampling in the follow-up paper (1310.4546). Word2vec is neither the next generation of RNN LMs nor a direct predecessor of Transformer embeddings. The king/queen analogy comes from the original papers; the results are approximate.

SOURCE: Mikolov et al. 2013a, 2013b (S22); Mikolov interviews (S27).

TRANSITION: Back to the "step by step" problem.`,

  "motor": `⏱ 2:00

SAY:
2017, the Transformer. I'll show it on today's GPT-style engine, bare minimum. Five steps. Text.

— next step —

It gets chopped into tokens, pieces of text. In our Czech example, the word "Kočka" (cat) becomes two tokens.

— next step —

Each token gets a numeric ID. That's just an item number in a catalogue. Under it, the model picks up a whole package of numbers — an embedding. And that's what it computes with.

— next step —

They go through the network: billions of learned numbers, no table of answers. The Transformer is built on attention instead of recurrence: every token can look at the preceding text, and during training the positions are processed in parallel. The limit: the context has a ceiling.

— next step —

At the end out comes a score for every possible next token.

POINT: Text → tokens → numbers → network → scores. No database of answers.

EXTRA / IF ASKED:
Two different mappings: the tokenizer's vocabulary assigns a token ID to a piece of text; the model's embedding table assigns that ID a learned vector with N dimensions.
Schematically: token → ID 33185 → row E[33185] → [0.12, −0.47, …]. The numbers in the vector are illustrative. The ID is an index, not the embedding itself nor the numeric meaning of the token. Neighbouring IDs don't mean similar words.
This is the input embedding. The same token starts with the same vector from the table; as it is processed in the network, its representation changes with context. Position information is incorporated in a way that depends on the specific architecture.

TECHNICAL NOTE: SIMPLIFIED FOR EXPLANATION. Attention existed before 2017; the Transformer removed recurrence. We show today's autoregressive LM, not the original encoder–decoder Transformer: o200k and billions of parameters are not 2017. Parallelization applies to training; generation still proceeds token by token. Tokenization per o200k_base (tiktoken), shown on the Czech sentence; other models have other tokenizers, and English text splits differently. Token ID → embedding (vector) + position information. Network = transformer: layers of attention + MLP, repeated N×; normalization and residual connections omitted. Attention is causal (it sees the current and previous positions, not future ones) and is not the same as reasoning. The model can memorize some training passages, so "not a database" ≠ "remembers nothing verbatim".

SOURCE: tiktoken (S3); Vaswani et al. 2017 (S2); Transformer Explainer (S1).

TRANSITION: So where did those learned numbers come from?`,

  "pretraining": `⏱ 1:30

SAY:
2018, the first GPT: we feed this engine a pile of text. Today's models do the same thing at a much larger scale. GPT stands for Generative Pre-trained Transformer. What we're describing here is pretraining: it produces a base model that can continue text. Learning the role of an assistant comes later.
From text. We hide the next word and let the model guess.

— next step —

It works for facts…

— next step —

…and for code.

— next step —

We compare with what was actually in the text and nudge the learned numbers a tiny bit. For today's large models we're talking about trillions of training tokens.

— next step —

To complete text well, it has to learn language, facts, code, style and relationships. Nobody wrote it any rules.

POINT: Pretraining = a huge number of small corrections. The abilities are a by-product of good completion.

IMAGE / OPTIONAL SAY:
(About 15 s.) "A bit like lossy compression of what people have written about the world. Regularities from an enormous amount of data get imprinted into the parameters."
The vice with the globe and pages is a metaphor. The model doesn't compress the world itself and isn't an archive from which we can pull out the original documents. The parameters can, however, memorize some passages. Don't compare hallucinations literally to JPEG artefacts. The technical relationship between prediction and lossless compression is a different claim from this visual analogy.

JOKE: A few billion knobs. Doing it by hand would take a while.

TECHNICAL NOTE: SIMPLIFIED FOR EXPLANATION. Words instead of tokens, illustrative examples. Trillions of tokens and the code example belong to today's scale, not the GPT 2018 corpus (S26, a smaller corpus of books). "Knobs" = learned parameters, not physical parts. It's not binary right/wrong: training increases the probability of the token actually observed (gradient descent via backpropagation). Training text need not be true. The abilities are an empirical result of data and model scale, not proof of human thinking; don't use the word "emergence" as an explanation.

SOURCE: Radford et al. 2018 (S26); Brown et al. 2020 (S4); Schaeffer et al. 2023 (S5).

TRANSITION: What does the result look like? A real example from 2019.`,

  "gpt2": `⏱ 1:00

SAY:
GPT-2, 2019. People gave it the beginning of a made-up news story: a herd of unicorns that speak English discovered in the Andes.

— next step —

And the model wrote an article. Newspaper style, a made-up biologist Jorge Pérez, quotes from scientists.

— next step —

Fluent text in the right genre. It develops the fiction it was given. It is not fact-checking the story.

POINT: A pretrained model can fluently continue in whatever genre it's handed.

TECHNICAL NOTE: A summary of the real sample (Radford et al. 2019, table 13), not a verbatim quote. The authors picked 1 of 10 attempts, top-k 40 sampling. It's a continuation of fiction: the input was already fiction, so this is not a hallucination in response to a factual question.

SOURCE: Radford et al. 2019, GPT-2 (S14).

TRANSITION: How does it choose a specific continuation?`,

  "kostka": `⏱ 1:00

SAY:
It's chosen by rolling a die. But the die is heavily loaded.

— next step —

Low temperature: the favourite wins.

— next step —

Higher temperature: the outsiders get a chance too.

— next step —

Stochastic doesn't mean chaos.

POINT: Chance picks within a very structured distribution.

TECHNICAL NOTE: Temperature is a parameter of today's models, an illustration; don't attribute it to historical n-grams (Shannon in 1948 did generate text by sampling from counts, but without this slider). Illustrative numbers: synthetic logits [3,2,1,0], softmax(logits / T), values actually computed. The ranking of candidates doesn't change. Temperature is not "creativity" and does not guarantee truth. T = 0 = the convention for greedy decoding. Even greedy may not be bit-for-bit reproducible (floating point, batching); sampling is not the only source of variability.

SOURCE: Transformer Explainer (S1); PyTorch Reproducibility / Numerical accuracy (S9, S10).

LIVE DEMO: (Optional, max 1 min from the reserve.) Transformer Explainer, move the temperature slider.

TRANSITION: And this repeats.`,

  "smycka": `⏱ 0:30

SAY:
The network gives us a menu of next tokens along with their probabilities. We pick one from that menu, stick it onto the text and run the whole thing again. That's how an answer gradually appears.
(Click quickly through the 3 steps on the right.) In our Czech example, "střeše" (roof) is built from three tokens.

POINT: Generation = a loop. Nothing more.

EXTRA / IF ASKED:
Context = the text so far; in a chat also the instructions and the available conversation history.
Network = processes the context and computes a score for every token in the vocabulary. This loop applies both to a base model and to a post-trained model that already works as an assistant.
Distribution = probabilities of the possible next tokens, adding up to 100 %. We haven't picked anything yet.
Sampling = drawing one token according to these probabilities. The favourite has the biggest chance but doesn't have to win. Temperature reshapes the distribution before the pick; the alternative is to take the most likely token without drawing (greedy decoding).
Next token = we append the chosen token, which creates a new context. Repeat.
An example just for intuition, whole words instead of tokens: "The cat sits on the" → roof 40 %, couch 30 %, floor 20 %, other 10 %. "Couch" comes up → new context "The cat sits on the couch" → we estimate again, maybe a full stop or "and". The numbers are made up for illustration, not model output nor the values in the chart on the slide.

TECHNICAL NOTE: It runs until an end-of-sequence token or a limit. The text is not re-tokenized; the ID is appended. The weights don't change during normal generation. The loop is a logical description; an implementation can store and reuse intermediate computations and doesn't have to recompute the whole context from scratch every time.

TRANSITION: Now let's try asking it for something.`,

  "base-model": `⏱ 1:15

SAY:
To be, or not to be? And a second one: Twinkle, twinkle… Leave a short pause for the audience.

— next step —

That is the question. And for the second one: …little star. We see a question or a prompt. A text completer may see the beginning of a well-known text and simply continue it. This is an illustration, not measured model output.

— next step —

And now a real example. The prompt: write a short story in French about a frog that travels in time to ancient Greece.

— next step —

GPT-3 without further training didn't write the story. It added more assignments: a story about a child and the gods, about a young man in another era…

— next step —

It saw the beginning of a list of assignments and continued that list. The limit of the GPT era: it can continue text, but the role of a helper isn't guaranteed.

POINT: A base model completes the document; helping is not its default role.

TECHNICAL NOTE: Shakespeare and the nursery rhyme are our illustrations of completing a well-known text, not authentic outputs of a specific model. "Twinkle, Twinkle, Little Star" is the English stand-in for the Czech children's song used in the Czech version (matches the English slide). A chat assistant could continue them the same way; the base/assistant difference is shown only by the frog example that follows. A summary of real outputs (Ouyang et al. 2022, fig. 42, same prompt as fig. 8), an example chosen by the authors for illustration, not a benchmark. A base model can follow instructions too, given a suitably built prompt; it is not completely incapable. An older completion model, not today's chat.

SOURCE: Ouyang et al. 2022, InstructGPT (S6), https://arxiv.org/html/2203.02155v1#A6.F42

TRANSITION: How do we turn a completer into an assistant?`,

  "instruction": `⏱ 0:45

SAY:
2022, ChatGPT. We show it documents that look like conversations.

— next step —

People write both sides of the dialogue. We keep training the same network on thousands of such examples.

— next step —

It's still completing a document. The document just looks like a conversation now.

POINT: Instruction tuning doesn't change the engine; it changes what kind of document the model completes.

TECHNICAL NOTE: The example on the slide is an illustration. Supervised fine-tuning (SFT); for ChatGPT, human trainers wrote both sides of the dialogue (S15). Recipes differ from model to model; don't attribute this exactly to the original InstructGPT.

SOURCE: OpenAI 2022, Introducing ChatGPT (S15); Ouyang et al. 2022 (S6).

TRANSITION: But there's more than one possible answer. Which one is better?`,

  "preference": `⏱ 1:15

SAY:
The question asks for a one-sentence answer. A launches into a long explanation. B gives one sentence. Which one do you want?

— next step —

People compare thousands of pairs. The model shifts towards what the raters prefer.

POINT: Preference = tuning based on what raters choose.

TECHNICAL NOTE: A synthetic illustration, not a real annotation record. Shorter is not better in general: B wins because the question explicitly asked for one sentence. Typically a reward model learned from human comparisons + RL (RLHF); other approaches exist, e.g. DPO (S16). Preference ≠ truth; it reflects the preferences of a particular group following instructions. The ChatGPT launch also mentions raters' bias towards longer answers, so don't claim that RLHF automatically makes answers shorter.

SOURCE: Ouyang et al. 2022 (S6); OpenAI 2022 (S15); Rafailov et al. 2023, DPO (S16).

TRANSITION: Let's go back to the frog.`,

  "zaba-po": `⏱ 0:45

SAY:
Same prompt. The base model wrote more assignments.

— next step —

After the full post-training it wrote a story about a tired frog looking for its way to Greece.

— next step —

Same engine. Different behaviour. The limit: it sounds like an answer, and that still doesn't guarantee truth.

POINT: Post-training changes behaviour, not the mechanism.

TECHNICAL NOTE: A summary of real outputs (fig. 42). InstructGPT = the whole SFT + RLHF pipeline, not the isolated effect of a single step. Outputs with different settings (GPT-3 T 0.7, InstructGPT T 1).

SOURCE: Ouyang et al. 2022, fig. 42 (S6).

TRANSITION: To sum it up in three steps.`,

  "evoluce": `⏱ 0:30

SAY:
A text completer.

— next step —

An assistant.

— next step —

A better assistant.

— next step —

First we taught the model to continue text. Then we taught it how to continue when we want something from it.

POINT: Pretraining → instruction tuning → preference.

TECHNICAL NOTE: Modern models have more stages (e.g. RL on tasks with verifiable results). Three are enough for this talk.

TRANSITION: We didn't swap the engine inside. And that leads to the first problem.`,

  "halucinace": `⏱ 1:00

SAY:
Today. It sounds like an answer. Confidently.

— next step —

That doesn't guarantee truth. The engine is still estimating the next token.

— next step —

The model can say "I don't know". But generation doesn't guarantee it will correctly recognise when.

POINT: Looks like an assistant ≠ guaranteed to be right.

TECHNICAL NOTE: At every step some distribution is produced and some token is picked; generation itself has no truth-checking step. Hallucinations have no single mechanism (rare data, conflicts, decoding, pressure to guess instead of abstaining). Training can improve abstention; neither RAG nor tools are a universal fix.

SOURCE: Kalai et al. 2025 (S7).

TRANSITION: The second thing that surprises people.`,

  "pocitani": `⏱ 1:00

SAY:
Let it hang for a moment.

— next step —

Where in that machine did you see a multiplier? The hardware multiplies, of course. But nobody guarantees correct multiplication of the numbers in the prompt.

— next step —

The fix: give it a calculator. If I have a calculator, I use it.

POINT: Deterministic problem → deterministic tool.

TECHNICAL NOTE: Models can do arithmetic partially, and reasoning models are strong at maths; multi-digit multiplication without a tool remains error-prone. The system must validate both the arguments and the tool's result. 2837 × 491 = 1,392,967, verified.

TRANSITION: And then there are things the model simply cannot know.`,

  "aktualni": `⏱ 1:30

SAY:
What's the price of bitcoin right now?

— next step —

What does our internal policy say?

— next step —

Training ended at some point. And if it never got our documents, without sources it could only guess. In the better case it admits uncertainty.

— next step —

We find the sources for it: search, APIs, documents. We add them to the question.

POINT: Retrieval (RAG) and tools give the system information the model doesn't have.

TECHNICAL NOTE: The parameters don't change with RAG. Quality depends on the retrieval; the model can still misuse the provided context.

SOURCE: Lewis et al. 2020, RAG (S11).

TRANSITION: And when we run this in a loop, we've got an agent.`,

  "agent": `⏱ 0:45

SAY:
The model proposes an action, code validates and runs it, the result goes back. And again, until it's done.

— next step —

The LLM isn't the whole agent. The rest is ordinary software. The limit: it's still an estimate; the system is responsible for the result.

POINT: Agent = LLM + tools + code in a loop.

TECHNICAL NOTE: The model doesn't run anything by itself; the surrounding code decides on permissions. Simply adding memory/state doesn't turn a model into an agent.

SOURCE: Yao et al. 2022, ReAct (S12).

TRANSITION: So where does an LLM belong, and where doesn't it?`,

  "spatne": `⏱ 1:00

SAY:
Date of birth. Is the person 18 yet? Sending that to an LLM: slower, more expensive, and sometimes wrong.

— next step —

Three lines of code. Following precisely defined rules.

— next step —

Don't turn a deterministic problem into a probabilistic one just because you have an LLM.

POINT: If you can write a rule, write the rule.

JOKE: Hallucinating age verification. Exactly what compliance wants to hear.

TECHNICAL NOTE: Determinism isn't correctness: code is correct only if the rules are correct. Age needs a reference date and calendar rules (29 February). An illustration of a computation, not a legal decision.

TRANSITION: And where, on the other hand, does an LLM make sense?`,

  "dobre": `⏱ 1:00

SAY:
"Oh great, it arrived broken again."

— next step —

The keyword says praise. And the rules keep piling up: an exception, an exception to the exception…

— next step —

Every human knows it's a complaint. This is where it pays to try a model and measure how well it classifies.

POINT: Use an LLM where we can't write the rule.

TECHNICAL NOTE: An LLM is not the only possible classifier. Restrict the output to a validated set of labels, including "uncertain → human"; the result is an estimate, not a fact.

TRANSITION: Let's put it together.`,

  "architektura": `⏱ 0:45

SAY:
The LLM in the middle: it understands what the user wants and proposes the next step.

— next step —

Before anything happens, software checks the permissions and arguments. Then come the tools and data.

— next step —

The results go back to the model.

— next step —

And on the output, a deterministic check again.

POINT: Deterministic software + probabilistic capabilities.

TECHNICAL NOTE: Guardrails = schema validation, allow-lists, permissions, limits, human-in-the-loop for irreversible actions. Schema validation checks the shape, not the truth.

TRANSITION: So… will we be destroyed by Terminators or transformers?`,

  "terminatori": `⏱ 1:00

SAY:
So, Terminators or transformers? I promised an honest answer.

— next step —

We've taken the mechanism apart. But that doesn't settle the question of consciousness or of safety. What we can control right now: permissions, verification, human oversight.

— next step —

DON'T PANIC doesn't mean don't care.

— next step —

An LLM isn't magic. It's software. Very strange software. Where a precise rule is enough, use it. Add a model where rules alone aren't enough. Thank you.

POINT: Don't panic ≠ don't care. Callback to the opening.

TECHNICAL NOTE: Don't downplay, don't exaggerate. Don't say the risks are "mostly in deployment". Don't make predictions about AGI.

TRANSITION: Resources + Q&A.`,

  "zdroje": `⏱ 0:00 (stays up during Q&A)

SAY:
If you want to get your hands on the box yourself: Transformer Explainer runs in your browser.

VIDEO FOR THE CURIOUS: Andrej Karpathy, Deep Dive into LLMs like ChatGPT. Chapters: tokenization 07:47, neural network I/O 14:27, inference 26:01, post-training 59:23, hallucinations and tools 1:20:32. (S13)

POINT: Anyone who wants to take the box apart further has somewhere to start.

SOURCE: full list in sources.md (S1–S27).

TRANSITION: Q&A.`,
};
