import { Module } from "module"
import { IClofyError } from "../models/error-model"

export type IResponse<T> = {
    data: T
    error?: false
} | { error: IClofyError }