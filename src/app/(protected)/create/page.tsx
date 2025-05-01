'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import React from 'react'
import { useForm } from 'react-hook-form'
//coz we r in frontend we r using react
import { api } from '@/trpc/react'
import { toast } from 'sonner'

type FormInput = {
    projectName: string,
    repoUrl: string,
    githubToken?: string
}

const CreatePage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInput>();

    const createProject = api.project.createProject.useMutation()

    function onSubmitHandler(data: FormInput) {

        console.log(data);
        

        createProject.mutate({
            githubUrl: data.repoUrl,
            name: data.projectName,
            githubToken: data.githubToken
        }, {
            onSuccess: () => {
                toast.success('Project Created Successfully')
                reset()
            },
            onError: () => {
                toast.error('Error creating a project')
            }
        })
        return true
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
            <Card className="w-full max-w-4xl shadow-lg">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex items-center justify-center w-full md:w-1/3">
                            <img
                                src="/draw.svg"
                                alt="GitHub Repository Illustration"
                                className="h-48 w-auto"
                            />
                        </div>

                        <div className="w-full md:w-2/3">
                            <CardHeader className="p-0 mb-6">
                                <CardTitle className="text-3xl font-bold mb-2">Link GitHub Repository</CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    Connect your codebase to start collaborating
                                </CardDescription>
                            </CardHeader>

                            <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-5">
                                <div className="space-y-2">
                                    <label htmlFor="projectName" className="text-sm font-medium">
                                        Project Name
                                    </label>
                                    <Input
                                        id="projectName"
                                        {...register('projectName', { required: true })}
                                        placeholder="My Awesome Project"
                                        className="w-full"
                                    />
                                    {errors.projectName && (
                                        <p className="text-red-500 text-xs mt-1">Project name is required</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="repoUrl" className="text-sm font-medium">
                                        Repository URL
                                    </label>
                                    <Input
                                        id="repoUrl"
                                        {...register('repoUrl', { required: true })}
                                        placeholder="https://github.com/username/repository"
                                        type="url"
                                        className="w-full"
                                    />
                                    {errors.repoUrl && (
                                        <p className="text-red-500 text-xs mt-1">Repository URL is required</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="githubToken" className="text-sm font-medium">
                                        GitHub Token <span className="text-xs text-muted-foreground">(Optional, required for private repositories)</span>
                                    </label>
                                    <Input
                                        id="githubToken"
                                        {...register('githubToken')}
                                        placeholder="ghp_xxxxxxxxxxxxxxxx"
                                        type="password"
                                        className="w-full"
                                    />
                                </div>

                                <div className="pt-2">
                                    <Button type="submit" disabled={createProject.isPending} className="w-full sm:w-auto">
                                        Connect Repository
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreatePage