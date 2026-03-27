import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import logoMindra from 'figma:asset/ab6f9166255db3716cdccdf4a9bcf1444d44ecb1.png';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recuperação de senha para:', email);
    setSubmitted(true);
    // Adicione sua lógica de recuperação de senha aqui
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Imagem de Fundo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-slate-900/5" />
      </div>

      {/* Card de Recuperação - Responsivo */}
      <Card className="relative z-10 w-full max-w-md shadow-xl backdrop-blur-sm bg-white/95 border-0 rounded-none">
        <CardHeader className="space-y-4 pt-8 px-6 pb-6">
          {/* Logo */}
          <div className="flex justify-center items-center mb-2 overflow-hidden mx-auto bg-white rounded-xl" style={{ width: '200px', height: '160px' }}>
            <img
              src={logoMindra}
              alt="MINDRA Logo"
              className="h-full w-auto object-cover brightness-100"
              style={{ objectPosition: 'center', filter: 'none' }}
            />
          </div>
          
          <CardTitle className="text-2xl text-center text-slate-900">
            Recuperar Senha
          </CardTitle>
          <CardDescription className="text-center text-base text-slate-600">
            Digite seu email para receber instruções de recuperação
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 h-12 text-base focus:border-blue-500 focus:ring-blue-500/30"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-base mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md">
              Enviar Instruções
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-slate-600">
                Lembrou sua senha?{' '}
                <Link 
                  to="/" 
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  Voltar ao Login
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}