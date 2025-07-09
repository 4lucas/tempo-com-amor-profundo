
import React, { useState, useCallback } from 'react';
import { Heart, Clock, MessageCircle, Share2, Hourglass, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

const Index = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [visitsPerYear, setVisitsPerYear] = useState('');
  const [parentsAge, setParentsAge] = useState('');
  const [calculatedVisits, setCalculatedVisits] = useState(0);
  const [estimatedAge, setEstimatedAge] = useState(0);

  const calculateVisits = useCallback(() => {
    const avgLifeExpectancy = 82;
    const currentAge = parseInt(parentsAge);
    const yearsRemaining = Math.max(0, avgLifeExpectancy - currentAge);
    const totalVisits = yearsRemaining * parseInt(visitsPerYear);
    
    setCalculatedVisits(totalVisits);
    setEstimatedAge(avgLifeExpectancy);
    
    // Move to next slide
    api?.scrollNext();
  }, [parentsAge, visitsPerYear, api]);

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(
      `Queridos pais,

Eu não consigo expressar em palavras o quanto amo vocês. Cada momento, cada ensinamento, cada gesto de carinho… tudo o que fazem por mim é algo que guardarei para sempre no meu coração. A presença de vocês em minha vida é uma verdadeira bênção, e me sinto honrado todos os dias por ser filho de pessoas tão especiais.

Vocês são essenciais para minha felicidade e meu crescimento. Não há nada que eu queira mais do que retribuir o amor e a dedicação que sempre me deram. Agradeço a Deus todos os dias por ter me abençoado com pais tão maravilhosos como vocês.

Que Deus continue abençoando a vida de vocês, trazendo sempre saúde, paz e alegria. Eu sou eternamente grato por tudo o que significam para mim e por tudo o que fizeram e fazem para que eu seja quem sou.

Com todo o meu amor e gratidão.`
    );
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  const nextSlide = () => {
    if (current === 1 && (!visitsPerYear || !parentsAge)) return;
    api?.scrollNext();
  };

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="min-h-screen warm-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress indicators */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[0, 1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    current >= step ? 'bg-primary' : 'bg-muted'
                  }`} />
                  {step < 3 && <div className="w-8 h-0.5 bg-muted mx-2" />}
                </div>
              ))}
            </div>
          </div>

          <Carousel 
            className="w-full"
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
            }}
          >
            <CarouselContent>
              {/* Slide 1: Welcome */}
              <CarouselItem>
                <Card className="card-gradient border-border shadow-lg">
                  <CardContent className="flex flex-col items-center justify-center min-h-[500px] text-center p-12">
                    <div className="animate-gentle-float mb-8">
                      <Hourglass className="h-20 w-20 text-primary animate-pulse-heart" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                      Tempo com os Pais
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                      Cada momento com quem amamos é precioso. Vamos refletir juntos sobre o tempo que nos resta com nossos pais.
                    </p>
                    <Button 
                      onClick={nextSlide}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg rounded-full"
                    >
                      Começar Reflexão
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>

              {/* Slide 2: Input Form */}
              <CarouselItem>
                <Card className="card-gradient border-border shadow-lg">
                  <CardHeader className="text-center pb-6">
                    <div className="flex justify-center mb-4">
                      <Clock className="h-12 w-12 text-primary animate-gentle-float" />
                    </div>
                    <CardTitle className="text-2xl md:text-3xl text-foreground">
                      Suas Visitas
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Conte-nos sobre seus encontros com seus pais
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-8 pb-12">
                    <div className="space-y-3">
                      <Label htmlFor="visits" className="text-foreground font-medium text-lg">
                        Quantas vezes você visita seus pais por ano?
                      </Label>
                      <Input
                        id="visits"
                        type="number"
                        value={visitsPerYear}
                        onChange={(e) => setVisitsPerYear(e.target.value)}
                        placeholder="Ex: 12"
                        className="text-lg p-4 border-input focus:border-ring focus:ring-ring"
                      />
                      <p className="text-sm text-muted-foreground italic">
                        Cada visita é um tesouro...
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="age" className="text-foreground font-medium text-lg">
                        Qual a idade de seus pais? (ou a média)
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        value={parentsAge}
                        onChange={(e) => setParentsAge(e.target.value)}
                        placeholder="Ex: 65"
                        className="text-lg p-4 border-input focus:border-ring focus:ring-ring"
                      />
                      <p className="text-sm text-muted-foreground italic">
                        Cada ano é uma benção...
                      </p>
                    </div>

                    <Button 
                      onClick={calculateVisits}
                      disabled={!visitsPerYear || !parentsAge}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-lg rounded-full disabled:opacity-50"
                    >
                      Calcular Momentos
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>

              {/* Slide 3: Results */}
              <CarouselItem>
                <Card className="card-gradient border-border shadow-lg">
                  <CardContent className="text-center p-12">
                    <div className="animate-gentle-float mb-6">
                      <Hourglass className="h-16 w-16 text-primary mx-auto animate-pulse-heart" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                      Reflexão sobre o Tempo
                    </h2>
                    <div className="text-6xl md:text-8xl font-bold text-primary mb-6 animate-scale-in">
                      {calculatedVisits}
                    </div>
                    <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
                      Você ainda pode visitar seus pais aproximadamente <strong>{calculatedVisits} vezes</strong>, 
                      considerando uma expectativa de vida até os {estimatedAge} anos.
                    </p>
                    <div className="bg-secondary p-6 rounded-2xl border-l-4 border-primary mb-8">
                      <p className="text-foreground italic text-lg leading-relaxed">
                        "O tempo é nosso bem mais valioso. Cada momento é uma oportunidade de dar carinho, 
                        agradecer e mostrar o quanto amamos quem nos trouxe ao mundo. 💖"
                      </p>
                    </div>
                    <Button 
                      onClick={nextSlide}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg rounded-full"
                    >
                      Ver Mensagem
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>

              {/* Slide 4: Share Message */}
              <CarouselItem>
                <Card className="card-gradient border-border shadow-lg">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <Heart className="h-12 w-12 text-primary animate-pulse-heart" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl text-foreground">
                      Fale agora, antes que não dê mais tempo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pb-12">
                    <div className="bg-secondary p-6 rounded-2xl text-foreground leading-relaxed">
                      <p className="mb-4">
                        <strong>Queridos pais,</strong>
                      </p>
                      <p className="mb-4">
                        Eu não consigo expressar em palavras o quanto amo vocês. Cada momento, cada ensinamento, cada gesto de carinho… tudo o que fazem por mim é algo que guardarei para sempre no meu coração. A presença de vocês em minha vida é uma verdadeira bênção, e me sinto honrado todos os dias por ser filho de pessoas tão especiais.
                      </p>
                      <p className="mb-4">
                        Vocês são essenciais para minha felicidade e meu crescimento. Não há nada que eu queira mais do que retribuir o amor e a dedicação que sempre me deram. Agradeço a Deus todos os dias por ter me abençoado com pais tão maravilhosos como vocês.
                      </p>
                      <p className="mb-4">
                        Que Deus continue abençoando a vida de vocês, trazendo sempre saúde, paz e alegria. Eu sou eternamente grato por tudo o que significam para mim e por tudo o que fizeram e fazem para que eu seja quem sou.
                      </p>
                      <p>
                        <strong>Com todo o meu amor e gratidão.</strong>
                      </p>
                    </div>
                    
                    <Button
                      onClick={shareOnWhatsApp}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg rounded-full flex items-center justify-center gap-3"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Compartilhar no WhatsApp
                    </Button>

                    <div className="text-center pt-8">
                      <div className="animate-gentle-float mb-4">
                        ✨
                      </div>
                      <p className="text-lg text-foreground leading-relaxed italic">
                        "Aproveite cada visita, cada abraço, cada conversa. 
                        O amor nunca tem prazo de validade."
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>

            {/* Navigation */}
            {current > 0 && (
              <CarouselPrevious className="left-4 bg-card border-border hover:bg-secondary" />
            )}
            {current < 3 && (
              <CarouselNext 
                className="right-4 bg-card border-border hover:bg-secondary"
                onClick={current === 1 ? calculateVisits : undefined}
              />
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Index;
