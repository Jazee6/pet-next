"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {loginSchema} from "@/schema/account";
import {useRouter, useSearchParams} from 'next/navigation'
import {Fetch} from "@/lib/fetch";
import toast from "react-hot-toast";
import {useState} from "react";
import {Separator} from "@/components/ui/separator";

export default function LoginForm() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [disabled, setDisabled] = useState(false)

    const form = useForm<z.infer<typeof loginSchema>>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema),
    })

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        setDisabled(true)
        Fetch.post('/account/login', values).then(() => {
            toast.success('登录成功', {icon: '🎉'})
            router.replace(searchParams.get('redirect') ?? '/admin')
        }).finally(() => {
            setDisabled(false)
        })
    }

    const handleGithubLogin = () => {
        setDisabled(true)
        const githubUrl = new URL('https://github.com/login/oauth/authorize')
        githubUrl.searchParams.set('client_id', 'Ov23liZI8IUWwsM0cUPk')
        githubUrl.searchParams.set('redirect_uri', location.origin + '/api/account/github')
        githubUrl.searchParams.set('scope', 'user:email')
        location.replace(githubUrl)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>邮箱</FormLabel>
                            <FormControl>
                                <Input placeholder="请输入邮箱" type="email" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>密码</FormLabel>
                            <FormControl>
                                <Input placeholder="请输入密码" type="password" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button className='w-full' type="submit" disabled={disabled}>登录</Button>

                <Separator/>

                <Button type='button' className='w-full' variant='outline' disabled={disabled} onClick={handleGithubLogin}>
                    使用 Github 登录
                </Button>
            </form>
        </Form>
    )
}
