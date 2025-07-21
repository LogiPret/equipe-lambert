import { RequiredDataFromCollectionSlug } from 'payload'

export const contactFormAcheter: RequiredDataFromCollectionSlug<'forms'> = {
  confirmationMessage: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: "Votre demande d'achat a été soumise avec succès.",
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          tag: 'h2',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  },
  confirmationType: 'message',
  createdAt: '2023-01-12T21:47:41.374Z',
  emails: [
    {
      emailFrom: '"Payload" \u003Cdemo@payloadcms.com\u003E',
      emailTo: '{{email}}',
      message: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: "Votre demande d'achat a été reçue avec succès.",
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      subject: "Vous avez reçu une nouvelle demande d'achat.",
    },
  ],
  fields: [
    {
      name: 'prenom',
      blockName: 'prenom',
      blockType: 'text',
      label: 'Prénom',
      required: true,
      width: 50,
    },
    {
      name: 'nom',
      blockName: 'nom',
      blockType: 'text',
      label: 'Nom',
      required: true,
      width: 50,
    },
    {
      name: 'email',
      blockName: 'email',
      blockType: 'email',
      label: 'Email',
      required: true,
      width: 50,
    },
    {
      name: 'phone',
      blockName: 'phone',
      blockType: 'text',
      label: 'Téléphone',
      required: false,
      width: 50,
    },
  ],
  redirect: undefined,
  submitButtonLabel: "Envoyer ma demande d'achat",
  title: 'Formulaire Acheter',
  updatedAt: '2023-01-12T21:47:41.374Z',
}
