import aboutImage from '@/assets/eusou.JPG';
import LazyImage from './LazyImage';
import AnimatedSection from './AnimatedSection';

const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 md:py-32" aria-labelledby="sobre-title">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <AnimatedSection animation="slide-left">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <LazyImage
                  src={aboutImage}
                  alt="Maju Santos - Personal Trainer certificada"
                  className="w-full h-full"
                />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/30 rounded-2xl -z-10" />
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection animation="slide-up" delay={200}>
            <div>
              <h2 id="sobre-title" className="font-display text-3xl md:text-5xl font-bold mb-6">
                Um pouco sobre mim
              </h2>
            
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                Me chamo Maria Julia Candeloro dos Santos, há mais de 6 anos, tenho a missão de transformar vidas através do movimento. Minha paixão é ajudar mulheres a resgatarem sua força, autoestima e confiança, mostrando que o treino vai muito além do físico: é sobre se sentir bem, acreditar em si mesma e conquistar uma vida mais leve e feliz.
              </p>
              <p>
                Graduada em Educação Física, coloco todo meu conhecimento e coração em cada treino, porque acredito que cada mulher merece resultados reais, sustentáveis e, acima de tudo, sentir orgulho da sua própria jornada.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-8">
              <div>
                <span className="block text-4xl font-bold text-primary" aria-label="Mais de 500 alunas transformadas">+500</span>
                <span className="text-sm text-foreground/60">Alunas transformadas</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-primary" aria-label="Mais de 6 anos de experiência">6+</span>
                <span className="text-sm text-foreground/60">Anos de experiência</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-primary" aria-label="98% de satisfação">98%</span>
                <span className="text-sm text-foreground/60">Satisfação das alunas</span>
              </div>
            </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
