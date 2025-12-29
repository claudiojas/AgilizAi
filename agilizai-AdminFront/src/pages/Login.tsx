import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Pizza, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-primary-foreground/20" />
          <div className="absolute bottom-40 right-20 w-60 h-60 rounded-full bg-primary-foreground/10" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-primary-foreground/15" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-primary-foreground">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
              <Pizza className="h-10 w-10" />
            </div>
            <div>
              <h1 className="font-display font-bold text-4xl">AgilizAI</h1>
              <p className="text-primary-foreground/80">Admin</p>
            </div>
          </div>
          
          <div className="max-w-md text-center space-y-6">
            <h2 className="font-display font-bold text-3xl">
              Gerencie seu restaurante com inteligência
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Controle pedidos em tempo real, atualize seu cardápio e acompanhe suas vendas em um só lugar.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-display font-bold text-3xl">500+</p>
              <p className="text-sm text-primary-foreground/70">Restaurantes</p>
            </div>
            <div>
              <p className="font-display font-bold text-3xl">50k+</p>
              <p className="text-sm text-primary-foreground/70">Pedidos/dia</p>
            </div>
            <div>
              <p className="font-display font-bold text-3xl">98%</p>
              <p className="text-sm text-primary-foreground/70">Satisfação</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Pizza className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground">AgilizAI</h1>
              <p className="text-sm text-muted-foreground">Admin</p>
            </div>
          </div>

          {/* Form Header */}
          <div className="text-center lg:text-left">
            <h2 className="font-display font-bold text-2xl text-foreground">Bem-vindo de volta!</h2>
            <p className="mt-2 text-muted-foreground">Entre com suas credenciais para acessar o painel</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Entrar
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Cadastre-se grátis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
