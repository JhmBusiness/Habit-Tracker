import { supabaseAdmin } from "@/app/_lib/supabase/admin";
import { createClient } from "@/app/_lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1). Create the user using the Service Role Key
    const { data: signUpData, error: signUpError } =
      await supabaseAdmin.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true,
        user_metadata: { is_demo: true },
      });

    if (signUpError) {
      console.error("Supabase Admin createUser error:", signUpError);
      return NextResponse.json({ error: signUpError.message }, { status: 500 });
    }

    // 2). Sign in the newly created user using the regular client (to set cookies for the browser)
    const supabase = await createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    // 3). Check for sign in errors, and if so, delete the user to keep db tidy.
    if (signInError) {
      console.error(
        "Supabase signInWithPassword error after demo user creation:",
        signInError
      );
      await supabaseAdmin.auth.admin.deleteUser(signUpData.user.id);
      return NextResponse.json({ error: signInError.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Demo user created and signed in successfully!",
    });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
