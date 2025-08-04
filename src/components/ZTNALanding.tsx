import { Shield, Lock, Eye, Users, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import heroImage from "@/assets/ztna-hero.jpg"
import networkVisual from "@/assets/network-visual.jpg"

export default function ZTNALanding() {
  const principles = [
    {
      icon: Shield,
      title: "Never Trust, Always Verify",
      description: "Every access request is authenticated and authorized before granting access"
    },
    {
      icon: Lock,
      title: "Least Privilege Access",
      description: "Users get minimal access required for their role and responsibilities"
    },
    {
      icon: Eye,
      title: "Continuous Monitoring",
      description: "Real-time analysis of user behavior and device health"
    }
  ]

  const benefits = [
    "Reduces insider threat risks by 60%",
    "Prevents lateral movement attacks",
    "Enhances compliance with security standards",
    "Supports remote work security",
    "Protects cloud and on-premise resources"
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-24 text-center">
          <StatusBadge variant="secure" className="mb-6">
            🔒 Zero Trust Network Access Simulator
          </StatusBadge>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-cyber bg-clip-text text-transparent">
            Trust No One Playbook
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Learn and experience Zero Trust Network Access through interactive simulations. 
            Understand how "never trust, always verify" protects modern organizations from cyber threats.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="cyber" size="lg" className="shadow-glow-primary">
              Start Simulation
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg">
              Learn Concepts
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">The Cybersecurity Challenge</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Traditional perimeter-based security models assume internal network users can be trusted. 
                However, with cloud computing, remote work, and sophisticated threats, this assumption 
                creates critical vulnerabilities.
              </p>
              <div className="space-y-4">
                <StatusBadge variant="threat">⚠️ Insider Threats</StatusBadge>
                <StatusBadge variant="threat">🔓 Lateral Movement</StatusBadge>
                <StatusBadge variant="threat">🔑 Credential Misuse</StatusBadge>
              </div>
            </div>
            <div className="relative">
              <img 
                src={networkVisual} 
                alt="Network Security Visualization"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Zero Trust Principles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Zero Trust Principles</h2>
            <p className="text-lg text-muted-foreground">
              Core principles that guide Zero Trust Network Access implementation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <principle.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{principle.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {principle.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Zero Trust Matters</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Organizations implementing Zero Trust architecture see significant improvements 
                in their security posture and operational efficiency.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-cyber p-8 rounded-2xl text-primary-foreground">
                <Users className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Interactive Learning</h3>
                <p className="opacity-90">
                  Experience ZTNA through role-based simulations with Admin, 
                  Retailer, and Guest access scenarios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Zero Trust?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your journey into Zero Trust Network Access with our interactive simulator. 
            Learn, practice, and understand the future of cybersecurity.
          </p>
          <Button variant="cyber" size="lg" className="shadow-glow-primary">
            Launch ZTNA Simulator
            <Shield className="w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}