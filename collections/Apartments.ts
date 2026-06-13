import type { CollectionConfig } from 'payload'
import { slugField } from '../utils/slug'

// Apartments for sale — catalog with inquiry (no online payment).
export const Apartments: CollectionConfig = {
  slug: 'apartments',
  labels: { singular: 'Апартамент', plural: 'Апартаменти' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'project', 'type', 'area', 'price', 'status'],
    group: 'Съдържание',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'title',
      label: 'Обозначение',
      type: 'text',
      required: true,
      admin: { description: 'Напр. „Апартамент А-12" или „Мезонет 3".' },
    },
    {
      name: 'project',
      label: 'Проект / сграда',
      type: 'relationship',
      relationTo: 'projects',
      admin: { description: 'Към кой проект принадлежи апартаментът.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          label: 'Тип',
          type: 'select',
          admin: { width: '50%' },
          options: [
            { label: 'Студио', value: 'studio' },
            { label: 'Едностаен', value: '1room' },
            { label: 'Двустаен', value: '2room' },
            { label: 'Тристаен', value: '3room' },
            { label: 'Четиристаен', value: '4room' },
            { label: 'Мезонет', value: 'maisonette' },
            { label: 'Ателие', value: 'atelier' },
          ],
        },
        {
          name: 'status',
          label: 'Статус',
          type: 'select',
          defaultValue: 'available',
          admin: { width: '50%' },
          options: [
            { label: 'Свободен', value: 'available' },
            { label: 'Резервиран', value: 'reserved' },
            { label: 'Продаден', value: 'sold' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'floor', label: 'Етаж', type: 'number', admin: { width: '33%' } },
        {
          name: 'area',
          label: 'Площ (кв.м)',
          type: 'number',
          admin: { width: '33%', description: 'Обща/застроена площ.' },
        },
        {
          name: 'netArea',
          label: 'Чиста площ (кв.м)',
          type: 'number',
          admin: { width: '33%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'exposure',
          label: 'Изложение',
          type: 'text',
          admin: { width: '50%', description: 'Напр. Изток/Юг.' },
        },
        {
          name: 'price',
          label: 'Цена (EUR)',
          type: 'number',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'priceOnRequest',
      label: 'Цена при запитване',
      type: 'checkbox',
      defaultValue: false,
    },
    { name: 'description', label: 'Описание', type: 'richText' },
    {
      name: 'images',
      label: 'Снимки',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'floorPlan',
      label: 'Разпределение (план)',
      type: 'upload',
      relationTo: 'media',
    },
    slugField('title'),
  ],
}
