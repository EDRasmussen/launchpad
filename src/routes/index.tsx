import { PersonalCalendar } from '@/components/personal-calendar'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {

    return (
        <div className="min-h-screen container mx-auto py-32 space-y-6">
            <div className="flex flex-row w-full gap-6">
                <div className="basis-1/3">
                    <PersonalCalendar />
                </div>
                <div className="basis-2/3">
                    <Card>
                        <CardHeader>
                            <CardTitle>News</CardTitle>
                            <CardDescription>Today's events</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 text-sm">
                                <div className="space-y-1 text-sm">
                                    <CardTitle>
                                        Microsoft announces new AI-powered features in
                                        Office 365
                                    </CardTitle>
                                    <div className="text-muted-foreground">
                                        Microsoft has unveiled a range of new
                                        AI-powered features for its Office 365 suite,
                                        aimed at enhancing productivity and user
                                        experience. The new features include an AI
                                        assistant that can help users with tasks such as
                                        scheduling meetings, drafting emails, and
                                        creating presentations.
                                    </div>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <CardTitle>
                                        Apple releases new iPhone 15 with groundbreaking
                                        features
                                    </CardTitle>
                                    <div className="text-muted-foreground">
                                        Apple has announced the release of the iPhone 15,
                                        which comes with a range of groundbreaking
                                        features. The new iPhone includes a faster
                                        processor, improved camera capabilities, and a
                                        longer-lasting battery. Additionally, it features
                                        a new design and enhanced security features.
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
