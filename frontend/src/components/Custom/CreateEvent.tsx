import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from '../ui/button'
import { CalendarIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import { toast } from "sonner"

import { useForm } from '@tanstack/react-form'
import type { FieldApi } from '@tanstack/react-form'
import { useNavigate } from "@tanstack/react-router"

import { zodValidator } from '@tanstack/zod-form-adapter'

import { createExperience, eventQueryOptions, loadingCreateExperienceQueryOptions } from "@/lib/api"
import { useQueryClient } from "@tanstack/react-query"

import { createExperienceSchema } from "@server/sharedTypes"

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
      <>
        {field.state.meta.touchedErrors ? (
          <em>{field.state.meta.touchedErrors}</em>
        ) : null}
        {field.state.meta.isValidating ? 'Validating...' : null}
      </>
    )
  }

export default function CreateEvent() {

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const form = useForm({
        validatorAdapter: zodValidator(),
        defaultValues: {
            title: '',
            desc: '',
            date: new Date().toISOString(),
            time: '',
            location: '',
            maxAttendance: '',
        },
        onSubmit: async ({ value }) => {
            const existingExperiences = await queryClient.ensureQueryData(
                eventQueryOptions
            )

            navigate({to: '/events'})

            queryClient.setQueryData(loadingCreateExperienceQueryOptions.queryKey, { experience: value })

            try {
                const newExperience = await createExperience({ value })

                queryClient.setQueryData(eventQueryOptions.queryKey, {
                    ...existingExperiences,
                    experiences: [newExperience, ...existingExperiences.experiences],
                })

                toast('Success', {
                    description: `${newExperience.title} has been created`
                })
            } catch (error) {
                toast('Error', {
                    description: 'Failed to create event'
                })
            } finally {
                queryClient.setQueryData(loadingCreateExperienceQueryOptions.queryKey, {})
            }

        },
    })

  return (
    <form 
        className='max-w-xl m-auto flex flex-col gap-2'
        onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }}
    >
        <form.Field 
            name='title'
            validators={{
                onChange: createExperienceSchema.shape.title
            }}
            children={(field) => (
                <div>
                    <Input 
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder='Title'
                        onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                </div>
            )}
        />

        <form.Field 
            name='desc'
            validators={{
                onChange: createExperienceSchema.shape.desc
            }}
            children={(field) => (
                <div>
                    <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder='description'
                        onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                </div>
            )}
        />

        <form.Field 
            name='date'
            children={(field) => (
                <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={'outline'}
                                className={cn('w-full justify-start text-left font-normal',
                                                'text-muted-foreground'
                                )}
                            >
                                <CalendarIcon className='mr-2 h-4 w-4' />
                                {field.state.value
                                    ? new Date(field.state.value).toLocaleDateString() 
                                    : 'Pick a date'
                                }
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align='start'>
                                <Calendar 
                                    mode='single'
                                    selected={new Date(field.state.value)}
                                    onSelect={(date) => field.handleChange((date ?? new Date()).toISOString())}
                                />
                        </PopoverContent>
                    </Popover>
                    <FieldInfo field={field} />
                </div>
            )}
        />

        <form.Field 
            name='time'
            validators={{
                onChange: createExperienceSchema.shape.time
            }}            
            children={(field) => (
                <div>
                    <Input 
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder='Time'
                        onChange={(e) => field.handleChange(e.target.value)}
                        type='time'
                    />
                    <FieldInfo field={field} />
                </div>
            )}
        />

        <form.Field 
            name='location'
            validators={{
                onChange: createExperienceSchema.shape.location
            }}
            children={(field) => (
                <div>
                    <Input 
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder='Location'
                        onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                </div>
            )}
        />

        <form.Field 
            name='maxAttendance'
            validators={{
                onChange: createExperienceSchema.shape.maxAttendance
            }}
            children={(field) => (
                <div>
                    <Input 
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder='# of people'
                        onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                </div>
            )}
        />

        <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Submit'}
              </Button>
            )}
        />
    </form>
  )
}
