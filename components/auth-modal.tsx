"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { PageTransition } from "./page-transition";

interface AuthModalProps {
  children: React.ReactNode;
}

export function AuthModal({ children }: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Fechar o modal e iniciar a transição
    setIsOpen(false);
    setShowTransition(true);
    
    // Aqui você pode adicionar a lógica de cadastro
    console.log("Cadastro", formData);
  };

  const handleTransitionComplete = () => {
    setShowTransition(false);
    // Aqui você pode redirecionar para outra página ou fazer outras ações
    console.log("Transição completa - usuário cadastrado!");
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-background border border-border">
          <div className="space-y-6 p-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-sentient">Join us</h2>
              <p className="font-mono text-sm text-foreground/60">
                Create your account to unlock your future growth
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-mono text-sm">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-mono text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-mono text-sm">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="font-mono text-sm">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="font-mono"
                  required
                />
              </div>

              <Button type="submit" className="w-full mt-6">
                [Create Account]
              </Button>
            </form>

            {/* Terms */}
            <div className="text-center">
              <p className="font-mono text-xs text-foreground/60">
                By creating an account, you agree to our{" "}
                <button className="text-primary hover:text-primary/80 transition-colors">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button className="text-primary hover:text-primary/80 transition-colors">
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PageTransition 
        isVisible={showTransition} 
        onComplete={handleTransitionComplete}
      />
    </>
  );
}