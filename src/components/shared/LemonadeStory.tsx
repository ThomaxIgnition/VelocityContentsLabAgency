import { Container, Eyebrow, Reveal, SplitHeading } from '../ui.tsx';
import { ORIGIN_STORY_TEXT } from '../../data.ts';

const BEATS = [
  'My daughter started a lemonade stand. She made the best lemonade I have ever tasted. But nobody came.',
  'After an hour, she was devastated. “Daddy, my lemonade is not good enough.”',
  'Wrong diagnosis. Her lemonade was exceptional. Her distribution was broken.',
  'We fixed three things: posted in the neighbourhood WhatsApp group, put signs where people actually walked, and she personally invited her friends’ parents.',
  'Twenty minutes later: fifteen customers. Sold out.'
];

export default function LemonadeStory() {
  return (
    <section id="lemonade" className="on-dark bg-ink text-paper grain overflow-hidden scroll-mt-20">
      <Container className="py-24 sm:py-32">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow dark>Where it started</Eyebrow>
            </Reveal>
            <SplitHeading
              text="The lemonade stand."
              accent="lemonade"
              className="mt-6 font-display font-light text-5xl sm:text-6xl tracking-[-0.03em] leading-[1.02] text-paper [&_.text-clay]:text-ember"
            />
            <Reveal delay={0.2}>
              <p className="mt-6 text-paper/60 text-lg leading-relaxed max-w-md">
                The observation that became our founding principle, and still shapes every engagement.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ol className="relative border-l border-paper/15 pl-8 sm:pl-10 space-y-8">
              {BEATS.map((beat, i) => (
                <Reveal as="li" key={i} delay={i * 0.06} className="relative">
                  <span className="absolute -left-[37px] sm:-left-[45px] top-2 w-2.5 h-2.5 rounded-full bg-paper/30" />
                  <p className="text-lg sm:text-xl leading-relaxed text-paper/80">{beat}</p>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={0.1}>
              <figure className="mt-14 p-8 sm:p-10 rounded-3xl bg-ember text-coal">
                <blockquote className="font-display text-2xl sm:text-3xl leading-snug tracking-tight">
                  “{ORIGIN_STORY_TEXT.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm text-coal/80">His daughter, aged seven. The wisest marketing insight of his career.</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
