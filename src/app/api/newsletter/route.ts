import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const data = await resend.emails.send({
      from: "Tailwind Store <onboarding@resend.dev>",
      to: [email],
      subject: "🎉 Bem-vindo à nossa Newsletter!",
      html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #111;">Obrigado por se inscrever!</h2>
      <p>Olá,</p>
      <p>É um prazer ter você conosco. A partir de agora, você receberá em primeira mão:</p>
      <ul>
        <li>Lançamentos exclusivos de papelaria e desk setup.</li>
        <li>Curadoria de recursos e artigos sobre produtividade.</li>
        <li>Ofertas especiais e cupons de desconto.</li>
      </ul>
      <p style="margin-top: 20px;">Como agradecimento, use o cupom abaixo na sua primeira compra:</p>
      <div style="background-color: #f3f4f6; padding: 15px; text-align: center; border-radius: 8px; font-weight: bold; font-size: 20px;">
        BEMVINDO10
      </div>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
      <p style="font-size: 12px; color: #666; text-align: center;">
        Este é um projeto de estudo (E-commerce Tailwind).<br/>
        Você recebeu este e-mail porque se cadastrou em nossa newsletter fictícia.
      </p>
    </div>
  `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
