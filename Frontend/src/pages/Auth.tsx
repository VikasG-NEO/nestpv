import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Lock, ArrowLeft, User, MapPin, Camera, Phone, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { INDIAN_STATES, CITIES_BY_STATE } from '@/data/indian_locations';
// @ts-ignore
import { initMojoAuth } from '@/lib/mojoauth';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup profile fields
  const [fullName, setFullName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('India');
  const [photo, setPhoto] = useState<string | null>(null);
  const [community, setCommunity] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState('');



  const { signUp, signIn, user, loginWithMojoToken } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image under 5MB",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Redirect if already logged in
  if (user) {
    navigate('/');
    return null;
  }

  // MojoAuth Login Setup
  useEffect(() => {
    const mojoauth = initMojoAuth();
    mojoauth.signIn().then(async (payload: any) => {
      if (payload?.oauth?.access_token) {
        // Need to verify this on backend
        // Or use the id_token if available
        // For now, let's assume we use the access_token
        try {
          const res = await loginWithMojoToken(payload.oauth.access_token, payload.user.email);
          if (res?.success) {
            toast({ title: "Welcome back!", description: "Successfully logged in via MojoAuth." });
            navigate('/');
          } else if (res?.isNewUser) {
            toast({ title: "Account not found", description: "Please complete your profile to sign up." });
            setEmail(res.email); // Pre-fill email
            // Switch to signup tab? Or just let them fill it.
            // Ideally we should switch tab
            const signupTab = document.querySelector('[data-value="signup"]') as HTMLElement;
            if (signupTab) signupTab.click();
          }
        } catch (e) {
          toast({ title: "Login Failed", description: "Could not verify MojoAuth token", variant: "destructive" });
        }
      }
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({ title: "Error", description: "Please enter email and password", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await signIn(loginEmail, loginPassword);
      toast({ title: "Success", description: "Logged in successfully" });
      navigate('/dashboard');
    } catch (error: any) {
      toast({ title: "Login Failed", description: error.message || "Invalid credentials", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!email || !password || !fullName || !signupPhone || !age || !gender || !address || !city || !state || !country || !community) {
      toast({
        title: "Error",
        description: "Please fill in all fields including profession",
        variant: "destructive",
      });
      return;
    }

    if (!photo) {
      toast({
        title: "Photo required",
        description: "Please upload your photo for ID card",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      toast({
        title: "Invalid age",
        description: "Age must be between 18 and 100",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await signUp({
        email,
        password,
        fullName,
        phone: signupPhone,
        age: ageNum,
        gender,
        address,
        city,
        state,
        country,
        photo,
        community // Send profession/community
      });

      // Calculate ID for display (optional, if backend returns it immediately)
      // Assuming signUp returns user object or we fetch it.
      // For immediate UI feedback:
      const year = new Date().getFullYear().toString().slice(-2);
      const communityMap: Record<string, string> = {
        'auto': 'AUT', 'dukandar': 'DUK', 'labour': 'LAB', 'taxi': 'TAX',
        'farmer': 'FRM', 'delivery': 'DEL', 'electrician': 'ELE', 'plumber': 'PLU', 'other': 'OTH'
      };
      const code = communityMap[community.toLowerCase()] || 'GEN';
      // We don't have the sequence from backend yet unless signUp returns it.
      // We'll show a placeholder or wait for redirect.

      setGeneratedId(`NN-${code}-${year}-XXXX`);
      setShowSuccess(true);

      setGeneratedId(`NN-${code}-${year}-XXXX`);
      setShowSuccess(true);

      // Auto-login and redirect
      try {
        await signIn(email, password);
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } catch (e) {
        // Fallback if auto-login fails
        toast({ title: "Account created", description: "Please log in with your credentials." });
        setTimeout(() => navigate('/'), 3000);
      }

    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "No backend connected. Please connect a backend service.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md border-border/50 shadow-2xl animate-in fade-in zoom-in-95 duration-500 text-center p-6">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <CardTitle className="text-2xl font-bold text-green-700">Account Created Successfully!</CardTitle>
            <CardDescription className="text-lg mt-2">
              Your NestUnion ID has been generated: <span className="font-bold text-primary block mt-1 text-xl">{generatedId}</span>
              You can now access all services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Your digital ID will be ready in a few seconds.</p>
            <div className="flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <Card className="border-border/50 shadow-2xl animate-in fade-in zoom-in-95 duration-500 backdrop-blur-sm bg-background/95">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">NestUnion</CardTitle>
            <CardDescription>Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h3 className="text-sm text-muted-foreground">Sign in with Magic Link</h3>
                    <div id="mojoauth-passwordless-form"></div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or with password</span></div>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input id="login-email" type="email" placeholder="m@example.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input id="login-password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      Sign In
                    </Button>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {/* Photo Upload */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center overflow-hidden bg-muted">
                      {photo ? (
                        <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    <Label htmlFor="photo-upload" className="cursor-pointer text-sm text-primary hover:underline">
                      {photo ? 'Change Photo' : 'Upload Photo *'}
                    </Label>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Profession Selection */}
                  <div className="space-y-4 border rounded-lg p-4 bg-muted/30">
                    <Label className="text-base font-semibold">Choose Your Profession *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Labour', 'Auto Driver', 'Electrician', 'Plumber', 'Farmer', 'Dukandar', 'Delivery Partner', 'Other'].map((prof) => (
                        <div
                          key={prof}
                          onClick={() => setCommunity(prof)}
                          className={`cursor-pointer border rounded-md p-3 text-center transition-all hover:border-primary ${community === prof ? 'border-primary bg-primary/10 ring-2 ring-primary/20' : 'bg-background hover:bg-accent'}`}
                        >
                          <p className="text-sm font-medium">{prof}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="full-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="+91XXXXXXXXXX"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Age and Gender Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="25"
                        min="18"
                        max="100"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender *</Label>
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Textarea
                        id="address"
                        placeholder="Enter your full address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="pl-10 min-h-[60px]"
                      />
                    </div>
                  </div>

                  {/* City and State Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select
                        value={state}
                        onValueChange={(value) => {
                          setState(value);
                          setCity('');
                        }}
                      >
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                          {INDIAN_STATES.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Select
                        value={city}
                        onValueChange={setCity}
                        disabled={!state}
                      >
                        <SelectTrigger id="city">
                          <SelectValue placeholder={state ? "Select City" : "Select State first"} />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                          {state && CITIES_BY_STATE[state]?.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                          {!state && <SelectItem value="placeholder" disabled>Select State first</SelectItem>}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      type="text"
                      placeholder="India"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
