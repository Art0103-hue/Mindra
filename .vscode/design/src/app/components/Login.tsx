import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoMindra from 'figma:asset/ab6f9166255db3716cdccdf4a9bcf1444d44ecb1.png';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', formData);
    // Adicione sua lógica de login aqui
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Imagem de Fundo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-slate-900/5" />
      </div>

      {/* Card de Login - Responsivo */}
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
            Bem-vindo de Volta
          </CardTitle>
          <CardDescription className="text-center text-base text-slate-600">
            Entre para continuar sua jornada
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 h-12 text-base focus:border-blue-500 focus:ring-blue-500/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 h-12 text-base focus:border-blue-500 focus:ring-blue-500/30"
              />
              <div className="text-right">
                <Link 
                  to="/esqueci-senha" 
                  className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  Esqueceu a senha?
                </Link>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md">
              Entrar
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-slate-600">
                Não tem uma conta?{' '}
                <Link 
                  to="/cadastro" 
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}