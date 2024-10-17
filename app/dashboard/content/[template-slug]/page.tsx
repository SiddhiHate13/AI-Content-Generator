"use client"
import React, { useContext, useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AiModal'
import { db } from '@/utils/db'
import { ai_output } from '@/utils/schema'

import moment from 'moment'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useRouter } from 'next/navigation'
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext'
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext'
import { useUser } from '@clerk/nextjs'

interface PROPS {
    params: {
        'template-slug': string
    }
}

function CreateNewContent(props: PROPS) {
   
    const selectedTemplate: TEMPLATE | undefined = Templates?.find((item) => item.slug === props.params['template-slug']);
    const [loading, setLoading] = useState(false);
    const [aiOutput, setAiOutput] = useState<string>('');
    const { user } = useUser();
    const router = useRouter();
    const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
    const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
    const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);

    /**
     * Used to generate content from AI
     * @param formData 
     * @returns 
     */
    const GenerateAIContent = async (formData: any) => {
        if (totalUsage >= 10000 && !userSubscription) {
            console.log("Please Upgrade");
            router.push('/dashboard/billing');
            return;
        }
        setLoading(true);

        const SelectedPrompt = selectedTemplate?.aiPrompt;
        const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;

        // Accessing the API key from the environment variables
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

        try {
            // Pass the API key to the chatSession.sendMessage
            const result = await chatSession.sendMessage(FinalAIPrompt, {
                apiKey: apiKey,
            });

            setAiOutput(await result?.response.text());
            await SaveInDb(JSON.stringify(formData), selectedTemplate?.slug, await result?.response.text());
        } catch (error) {
            console.error("Error generating AI content: ", error);
        } finally {
            setLoading(false);
            setUpdateCreditUsage(Date.now());
        }
    }

    const SaveInDb = async (formData: any, slug: any, aiResp: string) => {
        const result = await db.insert(ai_output).values({
            formData: formData,
            templateSlug: slug,
            aiResponse: aiResp,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD/MM/yyyy'),
        });

        console.log(result);
    }

    return (
        <div className='p-5'>
            <Link href={"/dashboard"}>
                <Button> <ArrowLeft /> Back</Button>
            </Link>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5 '>
                {/* FormSection  */}
                <FormSection
                    selectedTemplate={selectedTemplate}
                    userFormInput={(v: any) => GenerateAIContent(v)}
                    loading={loading} />
                {/* OutputSection  */}
                <div className='col-span-2'>
                    <OutputSection ai_output={aiOutput} />
                </div>
            </div>
        </div>
    )
}

export default CreateNewContent
