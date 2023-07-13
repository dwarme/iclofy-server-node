import { Module } from "module"
import { AppError } from "../models/error-model"

export type IResponse<T> = {
    data: T
    error?: false
} | { error: AppError }