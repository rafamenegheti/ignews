import axios from "axios";
import { Router } from 'next/router'

const url = Router.arguments.baseURL

export const api = axios.create({

    baseURL: url
})