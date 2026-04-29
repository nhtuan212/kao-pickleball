import Button from "@/components/Button";
import { toast } from "@/components/Toast";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { useModalStore } from "@/stores";
import { useAppForm, useDebounce } from "@/hooks";
import { usePlayer } from "@/hooks/queries";
import { playerSchema } from "@/utils";
import { GENDER_OPTIONS, TEXT } from "@/constants";
import { IPlayer } from "@/types";
import { Controller } from "react-hook-form";

export default function PlayerForm({ player }: { player?: IPlayer }) {
    //** Stores */
    const { closeModal } = useModalStore();

    //** Queries */
    const { createPlayer, updatePlayer } = usePlayer();

    //** Use App Form */
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useAppForm<IPlayer>({
        schema: playerSchema,
        defaultValues: playerSchema.parse(player || {}),
    });

    //** Functions */
    const handleSubmitPlayer = useDebounce(async (data: IPlayer) => {
        if (player) {
            return updatePlayer({ id: player.id, body: data }).then(() => {
                toast({
                    title: (
                        <div className="first-letter:uppercase lowercase">
                            {`${TEXT.UPDATE} ${TEXT.PLAYER} ${TEXT.SUCCESSFULLY} !`}
                        </div>
                    ),
                });
                closeModal();
            });
        }

        createPlayer(data);
    });

    //** Render */
    return (
        <form onSubmit={handleSubmit(handleSubmitPlayer)}>
            <div className="grid grid-cols-2 gap-4 p-1">
                <div className="col-span-2">
                    <Input
                        className="w-full"
                        label={TEXT.NAME}
                        {...register("name")}
                        placeholder={TEXT.NAME}
                        errorMessage={errors.name}
                    />
                </div>

                <div className="col-span-2">
                    <Input
                        className="w-full"
                        label={TEXT.PHONE}
                        {...register("phone")}
                        placeholder={TEXT.PHONE}
                        errorMessage={errors.phone}
                    />
                </div>

                <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                        <Select
                            label={TEXT.GENDER}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            errorMessage={errors.gender}
                        >
                            {GENDER_OPTIONS.map(gender => (
                                <Select.Item
                                    key={gender.id}
                                    id={gender.id}
                                    textValue={gender.value}
                                >
                                    {gender.value}
                                </Select.Item>
                            ))}
                        </Select>
                    )}
                />

                <Input
                    className="w-full"
                    label={TEXT.LEVEL}
                    {...register("level")}
                    placeholder={TEXT.LEVEL}
                    errorMessage={errors.level}
                />

                <Button type="submit" className="col-span-2 w-full">
                    {TEXT.SUBMIT}
                </Button>
            </div>
        </form>
    );
}
