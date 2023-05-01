import { DATE_FORMAT_LONG } from 'consts';
import format from 'date-fns/format';
import * as yup from 'yup';
import { DateSchema, NumberSchema } from 'yup';
import StringSchema from 'yup/lib/string';
import { AnyObject } from 'yup/lib/types';

export const numberSchema = (
  name: string,
  options?: {
    min?: number;
    max?: number;
    moreThan?: number;
    integer?: boolean;
    required?: boolean;
    nullable?: boolean;
  },
) => {
  let schema: NumberSchema<
    number | undefined | null,
    AnyObject,
    number | undefined | null
  > = yup.number();
  const { min, max, moreThan, integer, required, nullable } = options || {};
  if (min !== undefined) {
    schema = schema.min(min, `${name} must be greater than or equal to ${min}`);
  }
  if (max !== undefined) {
    schema = schema.max(max, `${name} must be less than or equal to ${max}`);
  }

  if (moreThan !== undefined) {
    schema = schema.moreThan(
      moreThan,
      `${name} must be greater than ${moreThan}`,
    );
  }

  if (integer) {
    schema = schema.integer(`${name} must be an integer`);
  }
  if (required) {
    schema = schema.required(`${name} is required`);
  }
  if (nullable || nullable === undefined) {
    schema = schema.nullable();
  }
  return schema;
};

export const stringSchema = (
  name: string,
  options?: { max?: number; required?: boolean; nullable?: boolean },
) => {
  let schema: StringSchema<
    string | undefined | null,
    AnyObject,
    string | undefined | null
  > = yup.string();
  const { max, required, nullable } = options || {};
  if (max !== undefined) {
    schema = schema.max(max, `${name} must be at most ${max} characters`);
  }
  if (required) {
    schema = schema.required(`${name} is required`);
  }
  if (nullable) {
    schema = schema.nullable();
  }
  return schema;
};

export const dateSchema = (
  name: string,
  options?: { required?: boolean; nullable?: boolean; min?: Date; max?: Date },
) => {
  let schema: DateSchema<
    Date | undefined | null,
    AnyObject,
    Date | undefined | null
  > = yup.date();
  const { required, nullable, max, min } = options || {};
  if (min !== undefined) {
    schema = schema.min(
      min,
      `${name} must be greater than or equal to ${format(
        min,
        DATE_FORMAT_LONG,
      )}`,
    );
  }
  if (max !== undefined) {
    schema = schema.max(
      max,
      `${name} must be less than or equal to ${format(max, DATE_FORMAT_LONG)}`,
    );
  }
  if (required) {
    schema = schema.required(`${name} is required`);
  }
  if (nullable) {
    schema = schema.nullable();
  }
  return schema;
};

export const booleanSchema = (
  name: string,
  options?: {
    required?: boolean;
  },
) => {
  let schema = yup.boolean();
  const { required } = options || {};
  if (required) {
    schema = schema.required(`${name} is required`);
  }
  return schema;
};

export function mergeSchema(...schemas: yup.SchemaOf<unknown>[]) {
  const [first, ...rest] = schemas;

  return rest.reduce(
    (mergedSchemas, schema) => mergedSchemas.concat(schema),
    first,
  );
}
