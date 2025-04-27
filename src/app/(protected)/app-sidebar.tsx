'use client'

import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar"

import { cn } from "@/lib/utils"
import { Bot, CreditCard, LayoutDashboard, Plus, Presentation } from "lucide-react"
import Image from "next/image"

import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Q&A",
        url: "/qa",
        icon: Bot
    },
    {
        title: "Meetings",
        url: "/meetings",
        icon: Presentation
    },
    {
        title: "Billing",
        url: "/billing",
        icon: CreditCard
    }
]

const projects = [
    {
        name: 'project 1'
    }
]

export function AppSidebar() {
    const pathname = usePathname()

    const { open } = useSidebar()

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <div className=" flex items-center gap-2">
                    <Image src='/logo.jpg' alt="logo" className=" rounded-md" width={48} height={48} />
                    {
                        open && (
                            <h1 className=" text-xl font-bold text-primary ">RepoPilot</h1>
                        )
                    }
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Application
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarItems.map(item => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            className={cn(
                                                pathname === item.url && "bg-primary text-white",
                                                "flex gap-2 items-center px-3 py-2 rounded-md"
                                            )}
                                        >
                                            <item.icon className="w-4 h-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Your Projects
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                projects.map(project => {
                                    return (
                                        <SidebarMenuItem key={project.name}>
                                            <SidebarMenuButton asChild>
                                                <div>
                                                    <div className={cn(
                                                        'rounded-sm size-6 flex items-center justify-center text-sm bg-white text-primary ', {
                                                        'bg-primary text-white': true
                                                        // 'bg-primary text-white' : project.id === project.id
                                                    }
                                                    )}>
                                                        {project.name[0]}
                                                    </div>
                                                    <span>{project.name}</span>
                                                </div>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })
                            }

                            <div className=" h-2">

                                {
                                    open && (
                                        <SidebarMenuItem>
                                            <Link href='/create'>
                                                <Button size='sm' variant={'outline'} className=" w-fit ">
                                                    <Plus />
                                                    Create a project
                                                </Button>
                                            </Link>
                                        </SidebarMenuItem>
                                    )
                                }

                            </div>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
