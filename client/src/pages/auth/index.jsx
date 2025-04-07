import Victory from "@/assets/victory.svg";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginPic from '../../../public/Login.png';
import SignUpPic from '../../../public/Signup.png';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [activeTab, setActiveTab] = useState("login");

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }
        console.log("Logging in:", email);
    };

    const handleSignup = async () => {
        if (!email || !password || !confirmPassword) {
            alert("Please fill in all the fields.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Signing up:", email);
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-br from-purple-400 via-purple-600 to-purple-800">
            <div className="h-[80vh] w-[90vw] md:w-[75vw] lg:w-[65vw] xl:w-[60vw] bg-white border-2 border-white shadow-2xl rounded-3xl flex">
                {/* Left Section */}
                <div className="flex flex-col items-center justify-center w-full xl:w-1/2 px-8 py-6">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-4xl font-bold md:text-5xl flex items-center">
                            Synchronous
                            <img src={Victory} alt="Victory Emoji" className="h-12 ml-2" />
                        </h1>
                        <p className="font-medium mt-2">The World's fastest growing Web Chat-App</p>
                    </div>
                    <div className="w-full max-w-sm mt-6">
                        <Tabs className="w-full" defaultValue="login" onValueChange={setActiveTab}>
                            <TabsList className="w-full flex">
                                <TabsTrigger value="login" className="flex-1 text-black text-opacity-90 border-b-2 rounded-none text-center p-3 transition-all data-[state=active]:font-semibold data-[state=active]:border-b-purple-500">LOGIN</TabsTrigger>
                                <TabsTrigger value="signup" className="flex-1 text-black text-opacity-90 border-b-2 rounded-none text-center p-3 transition-all data-[state=active]:font-semibold data-[state=active]:border-b-purple-500">SIGN-UP</TabsTrigger>
                            </TabsList>
                            <TabsContent className="flex flex-col gap-4 mt-6" value="login">
                                <Input placeholder="Email" type="email" className="rounded-full px-4 py-3" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Input placeholder="Password" type="password" className="rounded-full px-4 py-3" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Button className="rounded-full p-4 mt-3 w-full" onClick={handleLogin}>LOGIN</Button>
                            </TabsContent>
                            <TabsContent className="flex flex-col gap-4 mt-6" value="signup">
                                <Input placeholder="Email" type="email" className="rounded-full px-4 py-3" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Input placeholder="Password" type="password" className="rounded-full px-4 py-3" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Input placeholder="Confirm Password" type="password" className="rounded-full px-4 py-3" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <Button className="rounded-full p-4 mt-3 w-full" onClick={handleSignup}>SIGN UP</Button>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                {/* Right Section (Image) */}
                <div className="hidden xl:flex w-1/2 justify-center items-center">
                    <img src={activeTab === "login" ? LoginPic : SignUpPic} alt="Auth Illustration" className="h-[100%] object-contain" />
                </div>
            </div>
        </div>
    );
};

export default Auth;
