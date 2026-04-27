"use client";

import { useForm, UseFormProps, FieldValues, useFormContext, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";

interface UseAppFormProps<T extends FieldValues> extends UseFormProps<T> {
    schema?: ZodType<T, any, any>;
}

export function useAppForm<T extends FieldValues>({ schema, ...options }: UseAppFormProps<T> = {}) {
    return useForm<T>({
        mode: "all",
        ...(schema && { resolver: zodResolver(schema) }),
        ...options,
    });
}

export { FormProvider, useFormContext };
