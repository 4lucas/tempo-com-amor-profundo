
import React, { useState } from 'react';
import { Heart, Clock, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [step, setStep] = useState(1);
  const [visitsPerYear, setVisitsPerYear] = useState('');
  const [parentsAge, setParentsAge] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [calculatedVisits, setCalculatedVisits] = useState(0);
  const [estimatedAge, setEstimatedAge] = useState(0);

  const calculateVisits = () => {
    const avgLifeExpectancy = 82; // média brasileira
    const currentAge = parseInt(parentsAge);
    const yearsRemaining = Math.max(0, avgLifeExpectancy - currentAge);
    const totalVisits = yearsRemaining * parseInt(visitsPerYear);
    
    setCalculatedVisits(totalVisits);
    setEstimatedAge(avgLifeExpectancy);
    setStep(3);
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(
      `💖 Uma mensagem especial para vocês:\n\n${personalMessage}\n\n✨ Calculei que ainda posso visitá-los aproximadamente ${calculatedVisits} vezes. Cada momento é precioso!\n\nCom todo meu amor ❤️`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen sunset-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 animate-gentle-float">
          <Heart className="h-8 w-8 text-sunset-400" />
        </div>
        <div className="absolute top-40 right-20 animate-gentle-float" style={{ animationDelay: '2s' }}>
          <Clock className="h-6 w-6 text-sunset-500" />
        </div>
        <div className="absolute bottom-40 left-20 animate-gentle-float" style={{ animationDelay: '4s' }}>
          <Heart className="h-10 w-10 text-sunset-300" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {step === 1 && (
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <div className="mb-8">
              <Heart className="h-16 w-16 text-sunset-600 mx-auto mb-6 animate-pulse-heart" />
              <h1 className="text-4xl md:text-5xl font-bold text-sunset-800 mb-6 leading-tight">
                Tempo com os Pais
              </h1>
              <p className="text-lg md:text-xl text-sunset-700 leading-relaxed max-w-xl mx-auto">
                Cada momento com quem amamos é precioso. Vamos refletir juntos sobre o tempo que nos resta com nossos pais.
              </p>
            </div>
            
            <Card className="warm-gradient border-sunset-200 shadow-xl animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-8">
                <Button 
                  onClick={() => setStep(2)}
                  className="bg-sunset-600 hover:bg-sunset-700 text-white px-8 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Começar Reflexão
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-2xl mx-auto animate-slide-up">
            <Card className="warm-gradient border-sunset-200 shadow-xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl md:text-3xl text-sunset-800 mb-4">
                  Conte-nos um pouco sobre suas visitas
                </CardTitle>
                <p className="text-sunset-700">
                  As visitas não têm preço, mas cada uma delas é um tesouro.
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="visits" className="text-sunset-800 font-medium text-lg">
                    Quantas vezes você visita seus pais por ano?
                  </Label>
                  <Input
                    id="visits"
                    type="number"
                    value={visitsPerYear}
                    onChange={(e) => setVisitsPerYear(e.target.value)}
                    placeholder="Ex: 12"
                    className="text-lg p-4 border-sunset-300 focus:border-sunset-500 focus:ring-sunset-500"
                  />
                  <p className="text-sm text-sunset-600 italic">
                    O tempo com eles é único e não volta mais...
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="age" className="text-sunset-800 font-medium text-lg">
                    Qual a idade de seus pais? (ou a média, se tiverem idades diferentes)
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={parentsAge}
                    onChange={(e) => setParentsAge(e.target.value)}
                    placeholder="Ex: 65"
                    className="text-lg p-4 border-sunset-300 focus:border-sunset-500 focus:ring-sunset-500"
                  />
                  <p className="text-sm text-sunset-600 italic">
                    Cada ano é uma benção compartilhada...
                  </p>
                </div>

                <Button 
                  onClick={calculateVisits}
                  disabled={!visitsPerYear || !parentsAge}
                  className="w-full bg-sunset-600 hover:bg-sunset-700 text-white py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                >
                  Calcular Momentos Restantes
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <Card className="warm-gradient border-sunset-200 shadow-xl text-center">
              <CardContent className="p-8">
                <Heart className="h-12 w-12 text-sunset-600 mx-auto mb-6 animate-pulse-heart" />
                <h2 className="text-2xl md:text-3xl font-bold text-sunset-800 mb-6">
                  Reflexão sobre o Tempo
                </h2>
                <div className="text-6xl md:text-8xl font-bold text-sunset-700 mb-4 animate-scale-in">
                  {calculatedVisits}
                </div>
                <p className="text-lg md:text-xl text-sunset-700 mb-6 leading-relaxed">
                  Você ainda pode visitar seus pais aproximadamente <strong>{calculatedVisits} vezes</strong>, 
                  considerando uma expectativa de vida até os {estimatedAge} anos.
                </p>
                <div className="bg-sunset-100 p-6 rounded-2xl border-l-4 border-sunset-500">
                  <p className="text-sunset-800 italic text-lg leading-relaxed">
                    "O tempo é nosso bem mais valioso. Cada momento é uma oportunidade de dar carinho, 
                    agradecer e mostrar o quanto amamos quem nos trouxe ao mundo. Não deixe o tempo 
                    passar sem deixar suas memórias e seu amor por eles. 💖"
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="warm-gradient border-sunset-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-sunset-800 flex items-center gap-3">
                  <MessageCircle className="h-6 w-6" />
                  Mensagem para seus Pais
                </CardTitle>
                <p className="text-sunset-700">
                  Diga aos seus pais o quanto os ama e o quanto você é grato por tudo o que fizeram por você.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Textarea
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                  placeholder="Queridos pais, vocês são..."
                  className="min-h-32 text-lg p-4 border-sunset-300 focus:border-sunset-500 focus:ring-sunset-500"
                />
                
                {personalMessage && (
                  <Button
                    onClick={shareOnWhatsApp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <Share2 className="h-5 w-5" />
                    Compartilhar no WhatsApp
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="warm-gradient border-sunset-200 shadow-xl text-center">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="inline-block animate-gentle-float">
                    ✨
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-sunset-800 mb-4">
                  Uma Reflexão Final
                </h3>
                <p className="text-lg text-sunset-700 leading-relaxed italic">
                  "Aproveite cada visita, cada abraço, cada conversa. 
                  O amor nunca tem prazo de validade."
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
