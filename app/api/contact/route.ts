import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Convert JSON body to FormData for Contact Form 7
        const formData = new FormData();
        formData.append('nombre', body.nombre || '');
        formData.append('email', body.email || '');
        formData.append('telefono', body.telefono || '');
        formData.append('mensaje', body.mensaje || '');
        formData.append('categoria', body.categoria || '');
        formData.append('subcategoria', body.subcategoria || '');
        formData.append('_wpcf7_unit_tag', '0e5e6e2');

        const res = await fetch(
            'https://segurosegurosbe.aumenta.do/wp-json/contact-form-7/v1/contact-forms/337/feedback',
            {
                method: 'POST',
                body: formData,
            }
        );

        const data = await res.json();
        console.log('CF7 Response:', data);

        // Normalize response for the frontend
        return NextResponse.json({
            success: data.status === 'mail_sent',
            data: data
        });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ success: false, data: { message: 'Internal Server Error' } }, { status: 500 });
    }
}
