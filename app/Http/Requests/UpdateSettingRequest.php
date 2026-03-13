<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->hasRole('Admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'nullable|string|max:255',
            'email_primary' => 'nullable|email|max:255',
            'email_secondary' => 'nullable|email|max:255',
            'phone_primary' => 'nullable|string|max:255',
            'phone_secondary' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'description' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'whatsapp' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'twitter' => 'nullable|string|max:255',
            'instagram' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'youtube' => 'nullable|string|max:255',
            'tiktok' => 'nullable|string|max:255',
            'mail_mailer' => 'nullable|string|max:255',
            'mail_host' => 'nullable|string|max:255',
            'mail_port' => 'nullable|string|max:255',
            'mail_username' => 'nullable|string|max:255',
            'mail_password' => 'nullable|string|max:255',
            'mail_encryption' => 'nullable|string|max:255',
            'mail_from_address' => 'nullable|string|max:255',
            'mail_from_name' => 'nullable|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'name.string' => 'Name must be a valid text.',
            'name.max' => 'Name may not be greater than 255 characters.',

            'email_primary.email' => 'Primary email must be a valid email address.',
            'email_primary.max' => 'Primary email may not be greater than 255 characters.',

            'email_secondary.email' => 'Secondary email must be a valid email address.',
            'email_secondary.max' => 'Secondary email may not be greater than 255 characters.',

            'phone_primary.string' => 'Primary phone must be valid text.',
            'phone_primary.max' => 'Primary phone may not be greater than 255 characters.',

            'phone_secondary.string' => 'Secondary phone must be valid text.',
            'phone_secondary.max' => 'Secondary phone may not be greater than 255 characters.',

            'country.string' => 'Country must be valid text.',
            'country.max' => 'Country may not be greater than 255 characters.',

            'city.string' => 'City must be valid text.',
            'city.max' => 'City may not be greater than 255 characters.',

            'state.string' => 'State must be valid text.',
            'state.max' => 'State may not be greater than 255 characters.',

            'zip_code.string' => 'Zip code must be valid text.',
            'zip_code.max' => 'Zip code may not be greater than 255 characters.',

            'address.string' => 'Address must be valid text.',

            'description.string' => 'Description must be valid text.',

            'meta_title.string' => 'Meta title must be valid text.',
            'meta_title.max' => 'Meta title may not be greater than 255 characters.',

            'whatsapp.max' => 'Whatsapp may not be greater than 255 characters.',
            'facebook.max' => 'Facebook may not be greater than 255 characters.',
            'twitter.max' => 'Twitter may not be greater than 255 characters.',
            'instagram.max' => 'Instagram may not be greater than 255 characters.',
            'linkedin.max' => 'Linkedin may not be greater than 255 characters.',
            'youtube.max' => 'Youtube may not be greater than 255 characters.',
            'tiktok.max' => 'Tiktok may not be greater than 255 characters.',

            'mail_mailer.max' => 'Mail mailer may not be greater than 255 characters.',
            'mail_host.max' => 'Mail host may not be greater than 255 characters.',
            'mail_port.max' => 'Mail port may not be greater than 255 characters.',
            'mail_username.max' => 'Mail username may not be greater than 255 characters.',
            'mail_password.max' => 'Mail password may not be greater than 255 characters.',
            'mail_encryption.max' => 'Mail encryption may not be greater than 255 characters.',
            'mail_from_address.max' => 'Mail from address may not be greater than 255 characters.',
            'mail_from_name.max' => 'Mail from name may not be greater than 255 characters.',
        ];
    }
}
