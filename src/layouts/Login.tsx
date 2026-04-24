"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import ErrorMessage from "@/components/ErrorMessage";
import { Input, InputGroup } from "@/components/Input";
import { signIn } from "next-auth/react";
import { useAppForm } from "@/hooks";
import { loginSchema } from "@/utils";
import { ROUTE, STATUS_CODE, TEXT } from "@/constants";
import { Eye, EyeOff } from "lucide-react";

interface ILogin {
    username: string;
    password: string;
}

export default function Login() {
    const router = useRouter();

    //** States */
    const [isVisible, setIsVisible] = useState(false);
    const [isError, setIsError] = useState(false);

    //** Use App Form */
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useAppForm<ILogin>({
        schema: loginSchema,
        defaultValues: {
            username: "",
            password: "",
        },
    });

    //** Function */
    const handleLogin = async (data: ILogin) => {
        await signIn("credentials", { ...data, redirect: false }).then(res => {
            if (!res || res.status !== STATUS_CODE.OK) {
                setIsError(true);
                return;
            }

            setIsError(false);
            router.push(ROUTE.HOME);
            router.refresh();
        });
    };

    //** Render */
    return (
        <form
            className="min-h-screen flex justify-center items-center"
            onSubmit={handleSubmit(handleLogin)}
        >
            <Card className="flex flex-col items-center gap-y-4 w-full max-w-md p-4 border shadow-xl">
                <Card.Header className="items-center gap-y-2">
                    <Logo className="w-24" />
                    <h2 className="font-bold text-2xl uppercase">{TEXT.APP_NAME}</h2>
                    <h3>Hệ thống sân quản lý chuyên nghiệp</h3>
                </Card.Header>

                <Card.Content className="w-full space-y-2">
                    <Input
                        {...register("username")}
                        placeholder={TEXT.USERNAME}
                        errorMessage={errors.username}
                    />

                    <InputGroup errorMessage={errors.password}>
                        <InputGroup.Input
                            className="w-full"
                            {...register("password")}
                            type={!isVisible ? "password" : "text"}
                            placeholder={TEXT.PASSWORD}
                        />
                        <InputGroup.Suffix>
                            <Button
                                isIconOnly
                                variant="ghost"
                                onPress={() => setIsVisible(!isVisible)}
                            >
                                {!isVisible ? <Eye /> : <EyeOff />}
                            </Button>
                        </InputGroup.Suffix>
                    </InputGroup>

                    {isError && <ErrorMessage>{TEXT.LOGIN_FAILED}</ErrorMessage>}

                    <Button className="w-full" type="submit">
                        {TEXT.LOGIN}
                    </Button>
                </Card.Content>
            </Card>
        </form>
    );
}
