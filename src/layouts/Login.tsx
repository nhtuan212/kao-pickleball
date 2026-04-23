"use client";

import Image from "next/image";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { Input } from "@/components/Input";
import { TEXT } from "@/constants";

export default function Login() {
    //** Function */
    const handleLogin = () => {
        console.log("ok");
    };

    //** Render */
    return (
        <div className="min-h-screen flex justify-center items-center">
            <Card className="flex flex-col items-center gap-y-4 w-full max-w-md p-4 border shadow-xl">
                <Card.Header className="items-center gap-y-2">
                    <Image src="./logo.svg" alt="Logo" width={100} height={20} priority />
                    <h2 className="font-bold text-2xl">KAO PICKLEBALL</h2>
                    <h3>Hệ thống sân quản lý chuyên nghiệp</h3>
                </Card.Header>

                <Card.Content className="w-full space-y-2">
                    <Input placeholder={TEXT.USERNAME} />
                    <Input placeholder={TEXT.PASSWORD} />
                    <Button className="w-full" onPress={handleLogin}>
                        {TEXT.LOGIN}
                    </Button>
                </Card.Content>
            </Card>
        </div>
    );
}
