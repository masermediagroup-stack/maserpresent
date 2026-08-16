import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { product } from "@/config/product"

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-lg font-semibold tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Invite-only magic link access to {product.name}.
        </p>
      </div>
      <form className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Work email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@masermedia.co"
              disabled
            />
            <FieldDescription>
              Magic-link sign-in is wired in Phase 2.
            </FieldDescription>
          </Field>
        </FieldGroup>
        <Button type="button" disabled className="w-full">
          Send magic link
        </Button>
      </form>
    </div>
  )
}
