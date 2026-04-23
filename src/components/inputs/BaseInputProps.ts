import { z } from 'zod';

export const inputTypeSchema = z
  .enum([
    'text',
    'number',
    'boolean',
    'range',
    'select',
    'counter',
    'multi-counter',
    'timer',
    'multi-select',
    'checkbox-select',
    'image',
    'action-tracker',
    'TBA-team-and-robot',
    'TBA-match-number',
  ])
  .describe('The type of input');

export const inputBaseSchema = z.object({
  title: z.string().describe('The title of the input'),
  description: z.string().optional().describe('The description of the input'),
  type: inputTypeSchema,
  required: z.boolean().describe('Whether this input is required'),
  code: z.string().describe('A unique code for this input'),
  disabled: z.boolean().optional().describe('Whether this input is disabled'),
  formResetBehavior: z
    .enum(['reset', 'preserve', 'increment'])
    .default('reset')
    .describe('The behavior of this input when the form is reset'),
  defaultValue: z.unknown().describe('The default value'),
});

export const stringInputSchema = inputBaseSchema.extend({
  type: z.literal('text'),
  min: z.number().optional().describe('The minimum length of the string'),
  max: z.number().optional().describe('The maximum length of the string'),
  defaultValue: z.string().default('').describe('The default value'),
});

export const numberInputSchema = inputBaseSchema.extend({
  type: z.literal('number'),
  min: z.number().optional().describe('The minimum value'),
  max: z.number().optional().describe('The maximum value'),
  defaultValue: z.number().default(0).describe('The default value'),
});

export const selectInputSchema = inputBaseSchema.extend({
  type: z.literal('select'),
  choices: z.record(z.string()).optional().describe('The choices'),
  defaultValue: z
    .string()
    .default('')
    .describe('The default value. Must be one of the choices'),
});

export const multiSelectInputSchema = inputBaseSchema.extend({
  type: z.literal('multi-select'),
  choices: z.record(z.string()).optional().describe('The choices'),
  defaultValue: z.array(z.string()).optional().describe('The default value'),
});

export const checkboxSelectInputSchema = inputBaseSchema.extend({
  type: z.literal('checkbox-select'),
  choices: z.record(z.string()).optional().describe('The choices'),
  defaultValue: z.array(z.string()).optional().describe('The default value'),
});

export const counterInputSchema = inputBaseSchema.extend({
  type: z.literal('counter'),
  min: z.number().optional().describe('The minimum value'),
  max: z.number().optional().describe('The maximum value'),
  step: z.number().optional().describe('The step value').default(1),
  defaultValue: z.number().default(0).describe('The default value'),
});

export const multiCounterInputSchema = inputBaseSchema.extend({
  type: z.literal('multi-counter'),
  defaultValue: z.number().default(0).describe('The default value'),
});

export const rangeInputSchema = inputBaseSchema.extend({
  type: z.literal('range'),
  min: z.number().optional().describe('The minimum value'),
  max: z.number().optional().describe('The maximum value'),
  step: z.number().optional().describe('The step value').default(1),
  defaultValue: z.number().default(0).describe('The default value'),
});

export const booleanInputSchema = inputBaseSchema.extend({
  type: z.literal('boolean'),
  defaultValue: z.boolean().default(false).describe('The default value'),
});

export const timerInputSchema = inputBaseSchema.extend({
  type: z.literal('timer'),
  defaultValue: z.number().default(0).describe('The default value'),
  outputType: z
    .enum(['average', 'list'])
    .default('average')
    .describe('The type of output to display in the scouting form'),
});

export const imageInputSchema = inputBaseSchema.extend({
  type: z.literal('image'),
  defaultValue: z
    .string()
    .default('')
    .describe('The URL to a statically hosted image'),
  width: z.number().optional().describe('The width of the image in pixels'),
  height: z.number().optional().describe('The height of the image in pixels'),
  alt: z.string().optional().describe('The alt text for the image'),
});

export const actionSchema = z.object({
  label: z.string().describe('The display label for this action button'),
  code: z
    .string()
    .describe('A unique code for this action (used in field names)'),
  icon: z
    .string()
    .optional()
    .describe(
      'Optional Lucide icon name (e.g., "fuel", "target"). See https://lucide.dev/icons',
    ),
});

export const actionTrackerInputSchema = inputBaseSchema.extend({
  type: z.literal('action-tracker'),
  defaultValue: z
    .null()
    .default(null)
    .describe('Default value (null, as this input generates multiple fields)'),
  mode: z
    .enum(['tap', 'hold'])
    .default('hold')
    .describe(
      "Recording mode: 'tap' records instant timestamps on click, 'hold' records duration while button is pressed (default: 'hold')",
    ),
  actions: z
    .array(actionSchema)
    .min(1)
    .describe('The actions to track. Each action becomes a tappable button.'),
  timerDuration: z
    .number()
    .optional()
    .describe(
      'Expected duration in seconds (for UI reference, e.g., 15 for auto, 135 for teleop)',
    ),
  autoStopSeconds: z
    .number()
    .optional()
    .describe(
      'Automatically stop the timer after this many seconds. Useful to prevent the timer from running past the match phase duration.',
    ),
});

export const tbaTeamAndRobotInputSchema = inputBaseSchema.extend({
  type: z.literal('TBA-team-and-robot'),
  defaultValue: z
    .object({
      teamNumber: z.number(),
      robotPosition: z.string(),
    })
    .nullable()
    .default(null)
    .describe('The default team and robot position'),
});

export const tbaMatchNumberInputSchema = inputBaseSchema.extend({
  type: z.literal('TBA-match-number'),
  min: z.number().optional().describe('The minimum value'),
  max: z.number().optional().describe('The maximum value'),
  defaultValue: z.number().default(0).describe('The default value'),
});

export const sectionSchema = z.object({
  name: z.string(),
  fields: z.array(
    z.discriminatedUnion('type', [
      counterInputSchema,
      multiCounterInputSchema,
      stringInputSchema,
      numberInputSchema,
      selectInputSchema,
      multiSelectInputSchema,
      checkboxSelectInputSchema,
      rangeInputSchema,
      booleanInputSchema,
      timerInputSchema,
      imageInputSchema,
      actionTrackerInputSchema,
      tbaTeamAndRobotInputSchema,
      tbaMatchNumberInputSchema,
    ]),
  ),
});

const shadcnColorSchema = z
  .string()
  .regex(/^(\d+(?:\.\d+)?)(?: (\d+(?:\.\d+)?)%)?(?: (\d+(?:\.\d+)?)%)?$/gm);

const shadcnRadiusSchema = z
  .string()
  .regex(/([0-9]*.[0-9]+rem)/)
  .optional();

export const colorSchemeSchema = z.object({
  background: shadcnColorSchema,
  foreground: shadcnColorSchema,
  card: shadcnColorSchema,
  card_foreground: shadcnColorSchema,
  popover: shadcnColorSchema,
  popover_foreground: shadcnColorSchema,
  primary: shadcnColorSchema,
  primary_foreground: shadcnColorSchema,
  secondary: shadcnColorSchema,
  secondary_foreground: shadcnColorSchema,
  muted: shadcnColorSchema,
  muted_foreground: shadcnColorSchema,
  accent: shadcnColorSchema,
  accent_foreground: shadcnColorSchema,
  destructive: shadcnColorSchema,
  destructive_foreground: shadcnColorSchema,
  border: shadcnColorSchema,
  input: shadcnColorSchema,
  ring: shadcnColorSchema,
  radius: shadcnRadiusSchema,
  chart_1: shadcnColorSchema,
  chart_2: shadcnColorSchema,
  chart_3: shadcnColorSchema,
  chart_4: shadcnColorSchema,
  chart_5: shadcnColorSchema,
});

export type ColorScheme = z.infer<typeof colorSchemeSchema>;

export const themeSchema = z.object({
  light: colorSchemeSchema,
  dark: colorSchemeSchema,
});

export type QRScoutTheme = z.infer<typeof themeSchema>;

export const configSchema = z.object({
  title: z
    .string()
    .describe(
      'The title of the scouting site. This will be displayed in the header and browser tab.',
    ),
  page_title: z.string().describe('The title of the page'),
  year: z
    .number()
    .optional()
    .describe(
      'The year this scouting config is relevant for. Defaults to the current year if not provided.',
    ),
  delimiter: z
    .string()
    .describe('The delimiter to use when joining the form data'),
  teamNumber: z
    .number()
    .describe('The team number of the team using this form.'),
  floatingField: z
    .object({
      show: z
        .boolean()
        .describe(
          'Whether or not to always show this value at the top of the screen. May be useful on small screens',
        ),
      codeValue: z
        .string()
        .describe('Code of the form field to get this value from'),
    })
    .optional()
    .describe(
      'Optional floating text box at the tob of the screen to show things like the team number. May be useful on small screens',
    ),
  theme: themeSchema.default({
    light: {
      background: '0 0% 100%',
      foreground: '0 0% 0%',
      card: '0 0% 100%',
      card_foreground: '0 0% 0%',
      popover: '0 0% 100%',
      popover_foreground: '0 0% 0%',
      primary: '218 100% 32%',
      primary_foreground: '0 0% 100%',
      secondary: '350 74% 44%',
      secondary_foreground: '0 0% 100%',
      muted: '0 0% 90%',
      muted_foreground: '0 0% 40%',
      accent: '350 74% 44%',
      accent_foreground: '0 0% 100%',
      destructive: '0 84.2% 60.2%',
      destructive_foreground: '0 0% 98%',
      border: '0 0% 85%',
      input: '0 0% 85%',
      ring: '218 100% 32%',
      radius: '0.5rem',
      chart_1: '218 100% 32%',
      chart_2: '350 74% 44%',
      chart_3: '0 0% 50%',
      chart_4: '218 100% 50%',
      chart_5: '350 100% 50%',
    },
    dark: {
      background: '0 0% 10%',
      foreground: '0 0% 95%',
      card: '0 0% 15%',
      card_foreground: '0 0% 95%',
      popover: '0 0% 10%',
      popover_foreground: '0 0% 95%',
      primary: '218 100% 45%',
      primary_foreground: '0 0% 100%',
      secondary: '350 74% 55%',
      secondary_foreground: '0 0% 100%',
      muted: '0 0% 30%',
      muted_foreground: '0 0% 70%',
      accent: '350 74% 55%',
      accent_foreground: '0 0% 100%',
      destructive: '0 84.2% 60.2%',
      destructive_foreground: '0 0% 98%',
      border: '0 0% 25%',
      input: '0 0% 25%',
      ring: '218 100% 45%',
      radius: '0.5rem',
      chart_1: '218 100% 45%',
      chart_2: '350 74% 55%',
      chart_3: '0 0% 60%',
      chart_4: '218 100% 50%',
      chart_5: '350 100% 55%',
    },
  }),
  sections: z.array(sectionSchema),
});

export type InputTypes = z.infer<typeof inputTypeSchema>;

export type InputBase = z.infer<typeof inputBaseSchema>;
export type SelectInputData = z.infer<typeof selectInputSchema>;
export type MultiSelectInputData = z.infer<typeof multiSelectInputSchema>;
export type CheckboxSelectInputData = z.infer<typeof checkboxSelectInputSchema>;
export type StringInputData = z.infer<typeof stringInputSchema>;
export type NumberInputData = z.infer<typeof numberInputSchema>;
export type CounterInputData = z.infer<typeof counterInputSchema>;
export type MultiCounterInputData = z.infer<typeof multiCounterInputSchema>;
export type RangeInputData = z.infer<typeof rangeInputSchema>;
export type BooleanInputData = z.infer<typeof booleanInputSchema>;
export type TimerInputData = z.infer<typeof timerInputSchema>;
export type ImageInputData = z.infer<typeof imageInputSchema>;
export type ActionTrackerInputData = z.infer<typeof actionTrackerInputSchema>;
export type ActionData = z.infer<typeof actionSchema>;
export type TBATeamAndRobotInputData = z.infer<
  typeof tbaTeamAndRobotInputSchema
>;
export type TBAMatchNumberInputData = z.infer<typeof tbaMatchNumberInputSchema>;

export type InputPropsMap = {
  text: StringInputData;
  number: NumberInputData;
  boolean: BooleanInputData;
  range: RangeInputData;
  select: SelectInputData;
  'multi-select': MultiSelectInputData;
  'checkbox-select': CheckboxSelectInputData;
  counter: CounterInputData;
  'multi-counter': MultiCounterInputData;
  timer: TimerInputData;
  image: ImageInputData;
  'action-tracker': ActionTrackerInputData;
  'TBA-team-and-robot': TBATeamAndRobotInputData;
  'TBA-match-number': TBAMatchNumberInputData;
};

export type SectionProps = z.infer<typeof sectionSchema>;
export type Config = z.infer<typeof configSchema>;
