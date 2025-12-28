import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Menu, X, LogOut, LayoutDashboard, Search, Phone } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "../contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const navLinks = [
    { labelKey: "nav.home", href: "/" },
    { labelKey: "nav.communities", href: "/dashboard/community" },
    { labelKey: "nav.benefits", href: "/dashboard/benefits" },
    { labelKey: "nav.schemes", href: "/dashboard/schemes" },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: t('nav.signOut'),
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.labelKey}
                  to={link.href}
                  className="text-foreground/80 hover:text-primary font-medium transition-colors"
                >
                  {t(link.labelKey)}
                </Link>
              ) : (
                <a
                  key={link.labelKey}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary font-medium transition-colors"
                >
                  {t(link.labelKey)}
                </a>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <button className="text-foreground/70 hover:text-foreground transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-foreground/70 hover:text-foreground transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            {!loading && (
              user ? (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      {t('nav.dashboard')}
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('nav.signOut')}
                  </Button>
                </>
              ) : (
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6" asChild>
                  <Link to="/auth">{t('nav.joinNow')}</Link>
                </Button>
              )
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-up">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.labelKey}
                    to={link.href}
                    className="text-foreground/80 hover:text-primary font-medium py-3 px-4 rounded-lg hover:bg-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(link.labelKey)}
                  </Link>
                ) : (
                  <a
                    key={link.labelKey}
                    href={link.href}
                    className="text-foreground/80 hover:text-primary font-medium py-3 px-4 rounded-lg hover:bg-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(link.labelKey)}
                  </a>
                )
              ))}
              <div className="flex items-center justify-center py-2">
                <LanguageSwitcher />
              </div>
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/50">
                {!loading && (
                  user ? (
                    <>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          {t('nav.dashboard')}
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full" onClick={handleSignOut}>
                        <LogOut className="w-4 h-4 mr-2" />
                        {t('nav.signOut')}
                      </Button>
                    </>
                  ) : (
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>{t('nav.joinNow')}</Link>
                    </Button>
                  )
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}