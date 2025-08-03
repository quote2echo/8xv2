import React, { useState, useEffect } from 'react';
import { Check, Download, Star, Zap, Clock, DollarSign, PlayCircle, Sparkles, ChevronRight, CheckCircle2, Users, Target, Shield, ArrowRight, Cog, TrendingUp, Eye, Video, Music, BarChart3, Palette, Globe, Rocket } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface PreviousTimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [previousTimeLeft, setPreviousTimeLeft] = useState<PreviousTimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setPreviousTimeLeft(timeLeft);
        setTimeLeft({ days, hours, minutes, seconds });
        
        if (isInitialLoad) {
          setIsInitialLoad(false);
        }
        setIsExpired(false);
      } else {
        setIsExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, timeLeft, isInitialLoad]);

  if (isExpired) {
    return (
      <div className="mb-8 p-4 rounded-2xl bg-gray-800/50 border border-gray-700/50 max-w-md mx-auto">
        <p className="text-lg font-medium text-gray-300 text-center">
          ⏰ The launch offer has ended
        </p>
      </div>
    );
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  const hasChanged = (current: number, previous: number) => {
    return current !== previous;
  };

  return (
    <div className="mb-8 p-6 rounded-2xl bg-gray-800/50 border border-yellow-400/30 max-w-2xl mx-auto">
      <div className="text-center mb-4">
        <p className="text-sm font-medium text-yellow-400 mb-2">⚡ LIMITED TIME OFFER ENDS IN:</p>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {timeUnits.map((unit, index) => {
          const previousValue = index === 0 ? previousTimeLeft.days : 
                               index === 1 ? previousTimeLeft.hours :
                               index === 2 ? previousTimeLeft.minutes : 
                               previousTimeLeft.seconds;
          const shouldAnimate = isInitialLoad || hasChanged(unit.value, previousValue);
          
          return (
            <div key={unit.label} className="text-center">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-3 sm:p-4 border border-gray-700/50">
                <div className={`text-2xl sm:text-3xl font-bold text-white mb-1 transition-all duration-500 ${
                  shouldAnimate ? 'animate-pulse scale-110' : ''
                } ${isInitialLoad ? 'animate-bounce' : ''}`}>
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide">
                  {unit.label}
                </div>
              </div>
              {index < timeUnits.length - 1 && (
                <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2">
                  <span className="text-yellow-400 font-bold text-xl">:</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  const [showThankYou, setShowThankYou] = useState(false);
  
  // Set countdown target date (August 5, 2025 at 23:59:59 UTC)
  const countdownTarget = "2025-08-05T23:59:59Z";

  const handlePurchase = () => {
    // In a real app, this would integrate with Stripe
    setShowThankYou(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showThankYou) {
    return <ThankYouPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 px-4 py-2 text-sm font-medium text-red-300 border border-red-400/30 animate-pulse">
              <Sparkles className="h-4 w-4" />
              ⚡ Limited Launch: Save 75% Today Only
            </span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Turn AI Into Income
            </span>
            <br />
            <span className="text-white">— Instantly.</span>
          </h1>
          
          <p className="mb-10 text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
            Get 8 Plug-and-Play AI Workflows That Make Money While You Sleep.
            <br />
            <span className="text-yellow-400">No coding. No complexity. Just results.</span>
          </p>
          
          <CountdownTimer targetDate={countdownTarget} />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 font-semibold text-black transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-105 text-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                🔥 Get Instant Access – Start Automating Now
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              Instant Download
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-400" />
              30-Day Guarantee
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-400" />
              5,000+ Happy Customers
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-400/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 blur-3xl"></div>
        </div>
      </section>

      {/* Benefits at a Glance */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Cog className="h-8 w-8" />,
                title: "24/7 Automation",
                description: "Works while you sleep"
              },
              {
                icon: <DollarSign className="h-8 w-8" />,
                title: "Passive Income",
                description: "Set once, earn forever"
              },
              {
                icon: <PlayCircle className="h-8 w-8" />,
                title: "Plug & Play",
                description: "Ready in minutes"
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "No Coding",
                description: "Copy, paste, profit"
              }
            ].map((benefit, index) => (
              <div key={index} className="group text-center p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-yellow-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What You'll Get: 8 Money-Making AI Workflows</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Each workflow is battle-tested, plug-and-play, and designed to generate income on autopilot.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <TrendingUp className="h-6 w-6" />,
                title: "Viral Reels Factory",
                description: "Auto-generate trending short-form content that explodes on social media"
              },
              {
                icon: <Eye className="h-6 w-6" />,
                title: "Facebook Ad Spy",
                description: "Discover and replicate winning ad campaigns in any niche"
              },
              {
                icon: <Video className="h-6 w-6" />,
                title: "Auto B-Roll Editor",
                description: "Seamlessly add professional footage to videos without manual editing"
              },
              {
                icon: <Music className="h-6 w-6" />,
                title: "AI Powered Music Videos",
                description: "Create stunning music videos with AI-generated visuals"
              },
              {
                icon: <BarChart3 className="h-6 w-6" />,
                title: "Auto VSL Generator",
                description: "Generate high-converting video sales letters that sell 24/7"
              },
              {
                icon: <Palette className="h-6 w-6" />,
                title: "Product Visualization Funnels",
                description: "Create compelling product demos that convert browsers to buyers"
              },
              {
                icon: <Globe className="h-6 w-6" />,
                title: "AI Generated Conspiracy Dark Reels",
                description: "Tap into trending conspiracy themes with viral AI-generated content"
              },
              {
                icon: <Rocket className="h-6 w-6" />,
                title: "What If...? Cinematic Cold Space",
                description: "Create thought-provoking cinematic content exploring space themes"
              }
            ].map((workflow, index) => (
              <div key={index} className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center text-black">
                    {workflow.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                      {workflow.title}
                    </h3>
                    <p className="text-gray-400">{workflow.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Three simple steps to start making money with AI automation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Buy Once",
                description: "Secure your limited-time access for just $97",
                icon: <Download className="h-8 w-8" />
              },
              {
                step: "2",
                title: "Download & Deploy",
                description: "Follow simple guides to activate each workflow",
                icon: <Cog className="h-8 w-8" />
              },
              {
                step: "3",
                title: "Watch It Work",
                description: "Let AI run the show while you focus on growth",
                icon: <TrendingUp className="h-8 w-8" />
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  {/* Step Number Circle - Larger and more prominent */}
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 flex items-center justify-center shadow-xl shadow-yellow-400/25 group-hover:scale-110 transition-all duration-300">
                      <span className="text-black font-black text-2xl tracking-tight">{step.step}</span>
                    </div>
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-20 blur-xl -z-10"></div>
                  </div>
                  
                  {/* Icon Container */}
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 flex items-center justify-center text-yellow-400 group-hover:scale-105 group-hover:border-yellow-400/50 group-hover:shadow-lg group-hover:shadow-yellow-400/20 transition-all duration-300">
                    {step.icon}
                  </div>
                  
                  {/* Arrow for desktop */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600/50 flex items-center justify-center shadow-lg">
                        <ArrowRight className="h-5 w-5 text-yellow-400/70" />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="space-y-4 mt-6">
                  <h3 className="text-xl font-semibold group-hover:text-yellow-400 transition-colors duration-300">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for Entrepreneurs, Not Engineers</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Whether you're a content creator, agency owner, digital marketer, or solo hustler — 
              these workflows are built for real people, not developers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Content Creators",
              "Digital Marketers", 
              "Agency Owners",
              "Solo Entrepreneurs"
            ].map((persona, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gray-900/50 border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
                  <Users className="h-6 w-6 text-black" />
                </div>
                <h3 className="font-semibold">{persona}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why This Isn't Like Anything You've Seen</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              This isn't another AI course or theory. These are execution-ready workflows that make money.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Cog className="h-8 w-8" />,
                title: "Fully Automated",
                description: "Not theory — actual execution-ready workflows that run themselves"
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "AI-Driven",
                description: "Created with proven prompts, models, and logic that actually work"
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Built for Results",
                description: "These workflows generate money, not just busy work or tasks"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300">
                <div className="text-yellow-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of entrepreneurs already making money with AI automation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Mitchell",
                role: "Digital Marketer",
                content: "These workflows completely transformed my business. I'm now making $5,000+ per month in passive income while focusing on scaling other ventures.",
                rating: 5
              },
              {
                name: "Marcus Chen",
                role: "Content Creator",
                content: "The viral reels factory alone has generated over 2 million views for my content. The ROI is incredible – paid for itself in the first week.",
                rating: 5
              },
              {
                name: "Emma Rodriguez",
                role: "Online Entrepreneur",
                content: "Finally, automation that actually works! No technical headaches, just plug-and-play systems that generate real money. Highly recommended.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-6 rounded-2xl bg-gray-900/50 border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-400/30">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-400 flex items-center justify-center">
              <Shield className="h-8 w-8 text-green-900" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">✅ 30-Day No-Risk Guarantee</h2>
            <p className="text-lg text-gray-300 mb-4">
              If you don't love the results, we'll refund you. No questions asked.
            </p>
            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                Secure Checkout
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                Instant Access
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                Full Refund Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-800/30">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">⚙️ Unlock the 8 AI Workflows – Save 75% Today</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Limited time launch price. Regular price will be $497 after launch week.
            </p>
          </div>
          
          <div className="relative max-w-md mx-auto">
            {/* Pricing badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1 rounded-full text-sm font-medium animate-pulse">
                75% OFF Launch Special
              </span>
            </div>
            
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-yellow-400/50 shadow-xl shadow-yellow-400/10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Complete Workflow Package</h3>
                <div className="mb-4">
                  <span className="text-4xl sm:text-5xl font-bold text-yellow-400">$97</span>
                  <span className="text-lg text-gray-400 line-through ml-2">$497</span>
                </div>
                <p className="text-gray-400">One-time payment, lifetime access</p>
              </div>
              
              <div className="space-y-4 mb-8">
                {[
                  "All 8 AI-powered workflows",
                  "Step-by-step setup guides",
                  "24/7 automation systems",
                  "No monthly fees or subscriptions",
                  "Lifetime updates included",
                  "30-day money-back guarantee"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={handlePurchase}
                className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 font-semibold text-black transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-105 text-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  🔥 Get Instant Access – Start Automating Now
                  <Download className="h-5 w-5 transition-transform group-hover:translate-y-1" />
                </span>
              </button>
              
              <p className="text-center text-sm text-gray-400 mt-4">
                Secure checkout • Instant download • 30-day guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400">
              Everything you need to know about the AI workflows.
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "Do I need any tech skills?",
                answer: "Nope! Just copy, paste, and follow simple steps. These workflows are designed for real people, not developers."
              },
              {
                question: "How do I access the workflows?",
                answer: "You get instant access after purchase via download. Everything is delivered as a ZIP file with clear instructions."
              },
              {
                question: "Can I customize the workflows?",
                answer: "Yes — they're fully editable and flexible. You can adapt them to your specific needs and niche."
              },
              {
                question: "Is there a refund policy?",
                answer: "Absolutely. Try it risk-free for 30 days. If you're not satisfied, we'll refund you completely."
              },
              {
                question: "How quickly can I start making money?",
                answer: "Most users see results within the first week. The workflows are designed for immediate implementation and quick returns."
              },
              {
                question: "Do these work in any niche?",
                answer: "Yes! The workflows are versatile and can be adapted to work in virtually any industry or niche market."
              }
            ].map((faq, index) => (
              <div key={index} className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-3 text-yellow-400">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-gray-400">
            © 2025 AI Automated ATM Workflows. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
              Welcome to the AI Revolution!
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your purchase was successful. You now have instant access to all 8 AI Automated ATM Workflows that will transform your income forever.
          </p>
        </div>
        
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50 mb-8">
          <h2 className="text-2xl font-semibold mb-4">🚀 Download Your Money-Making Workflows</h2>
          <p className="text-gray-400 mb-6">
            Click the button below to download your complete workflow package. Save the ZIP file to your computer and extract it to start your AI automation journey.
          </p>
          
          <a
            href="https://example.com/download/ai-workflows.zip"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 text-lg"
          >
            <Download className="h-5 w-5" />
            Download All 8 Workflows (ZIP)
          </a>
        </div>
        
        <div className="space-y-4 text-left bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-center mb-4">🎯 Your Path to AI-Powered Income</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-yellow-400 text-black flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
              <div>
                <div className="font-medium">Extract the ZIP file</div>
                <div className="text-sm text-gray-400">Unzip the downloaded file to access all 8 money-making workflows</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-yellow-400 text-black flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
              <div>
                <div className="font-medium">Read the setup guides</div>
                <div className="text-sm text-gray-400">Each workflow includes detailed, step-by-step instructions</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-yellow-400 text-black flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
              <div>
                <div className="font-medium">Start with your favorite workflow</div>
                <div className="text-sm text-gray-400">Pick the workflow that excites you most and implement it first</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-yellow-400 text-black flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</div>
              <div>
                <div className="font-medium">Watch the money roll in</div>
                <div className="text-sm text-gray-400">Let AI automation work 24/7 while you focus on scaling</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gradient-to-r from-green-900/20 to-green-800/20 rounded-xl border border-green-400/30">
          <h3 className="text-lg font-semibold mb-2">🛡️ Remember: You're Protected</h3>
          <p className="text-sm text-gray-300">
            You have a full 30-day money-back guarantee. If you're not completely satisfied with the results, just contact our support team for a full refund.
          </p>
        </div>
        
        <p className="text-sm text-gray-400 mt-8">
          Questions? Contact our support team at support@aiworkflows.com
        </p>
      </div>
    </div>
  );
}

export default App;