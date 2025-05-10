import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json(); // Extraindo dados da requisição

    if (!email || !password) {
      return NextResponse.json({ error: 'E-mail e senha são obrigatórios' }, { status: 400 });
    }

    await sendgrid.send({
      to: email,
      from: 'no-reply@suaempresa.com', // Alterar para um e-mail verificado no SendGrid
      subject: 'Sua senha de acesso à empresa aérea',
      text: `Sua senha de acesso é: ${password}`,
      html: `<p>Olá! Aqui está sua senha de acesso: <strong>${password}</strong></p>`,
    });

    return NextResponse.json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json({ error: 'Erro ao enviar o e-mail' }, { status: 500 });
  }
}
