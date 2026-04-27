import Button from "@/components/Button";
import { Input } from "@/components/Input";
import { TEXT } from "@/constants";
import { useAppForm } from "@/hooks";
import { playerSchema, TPlayerForm } from "@/utils";
import { Label } from "@heroui/react";

export default function PlayerForm() {
    //** Use App Form */
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useAppForm<TPlayerForm>({
        schema: playerSchema,
        defaultValues: playerSchema.parse({}),
    });

    //** Functions */
    const handleSubmitPlayer = async (data: TPlayerForm) => {
        console.log({ data });
    };

    //** Render */
    return (
        <form onSubmit={handleSubmit(handleSubmitPlayer)}>
            <div className="grid grid-cols-2 gap-4 p-1">
                <div className="col-span-2">
                    <Label>{TEXT.NAME}</Label>
                    <Input
                        className="w-full"
                        {...register("name")}
                        placeholder={TEXT.NAME}
                        errorMessage={errors.name}
                    />
                </div>

                <div className="col-span-2">
                    <Label>{TEXT.PHONE}</Label>
                    <Input
                        className="w-full"
                        {...register("phone")}
                        placeholder={TEXT.PHONE}
                        errorMessage={errors.phone}
                    />
                </div>

                <div>
                    <Label>{TEXT.GENDER}</Label>
                    <Input
                        className="w-full"
                        {...register("gender")}
                        placeholder={TEXT.GENDER}
                        errorMessage={errors.gender}
                    />
                </div>

                <div>
                    <Label>{TEXT.LEVEL}</Label>
                    <Input
                        className="w-full"
                        {...register("level")}
                        placeholder={TEXT.LEVEL}
                        errorMessage={errors.level}
                    />
                </div>

                <Button type="submit" className="col-span-2 w-full">
                    {TEXT.SUBMIT}
                </Button>
            </div>
        </form>
    );
}
