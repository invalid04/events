import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from '../ui/button'

import { useForm } from '@tanstack/react-form'
import type { FieldApi } from '@tanstack/react-form'
import { useNavigate } from "@tanstack/react-router"

import { zodValidator } from '@tanstack/zod-form-adapter'

import { api } from "@/lib/api"

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

    const navigate = useNavigate()

    const form = useForm({
        validatorAdapter: zodValidator(),
        defaultValues: {
            title: '',
            desc: '',
            date: '',
            time: '',
            location: '',
            maxAttendance: '',
        },
        onSubmit: async ({ value }) => {
            const res = await api.experiences.$post({ json: value })
            if (!res.ok) {
                throw new Error('server error')
            }
            navigate({to: '/events'})
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
                <>
                    <Input 
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder='Title'
                        onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                </>
            )}
        />

        <form.Field 
            name='desc'
            children={(field) => (
                <>
                    <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder='description'
                        onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                </>
            )}
        />

        <form.Field 
            name='date'
            children={(field) => (
                <>
                    <Input 
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder='Date'
                        onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                </>
            )}
        />

        <form.Field 
            name='time'
            children={(field) => (
                <>
                    <Input 
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder='Time'
                        onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                </>
            )}
        />

        <form.Field 
            name='location'
            children={(field) => (
                <>
                    <Input 
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder='Location'
                        onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                </>
            )}
        />

        <form.Field 
            name='maxAttendance'
            validators={{
                onChange: createExperienceSchema.shape.maxAttendance
            }}
            children={(field) => (
                <>
                    <Input 
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder='# of people'
                        onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                </>
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
