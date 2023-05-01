import { Factory } from 'rosie';
import { faker } from '@faker-js/faker';
import {
  AssetList,
  AssetDetails,
  AssetReferenceMaterial,
  Baseline,
  EmissionManagementPlan,
  AssetMode,
  AssetPhase,
  AssetTypeEnum,
} from 'api/schema';

export const AssetListFactory = Factory.define<AssetList>('assetList')
  .sequence('id')
  .attr('name', () => faker.lorem.words(2))
  .attr('type', () => {
    return faker.random.arrayElement(Object.values(AssetTypeEnum));
  })
  .attr('design_description', () => faker.lorem.words())
  .attr('draft', () => faker.datatype.boolean());

export const BaselineFactory = Factory.define<Baseline>('baseline')
  .sequence('id')
  .attr('name', () => faker.lorem.words(2))
  .attr('description', () => faker.lorem.words(5))
  .attr('updated_at', () => faker.date.past().toISOString())
  .attr('active', () => faker.datatype.boolean())
  .attr('draft', () => faker.datatype.boolean());

export const EmissionManagementPlanFactory =
  Factory.define<EmissionManagementPlan>('emissionManagementPlan')
    .sequence('id')
    .attr('name', () => faker.lorem.words(2))
    .attr('version', () => String(faker.datatype.float()))
    .attr('description', () => faker.lorem.words(5))
    .attr('updated_at', () => faker.date.past().toISOString())
    .attr('active', () => faker.datatype.boolean())
    .attr('draft', () => faker.datatype.boolean());

export const AssetDetailsFactory = Factory.define<AssetDetails>('assetDetails')
  .extend(AssetListFactory)
  .attr('baselines', BaselineFactory.buildList(10))
  .attr(
    'emission_management_plans',
    EmissionManagementPlanFactory.buildList(10),
  );

export const AssetReferenceMaterialFactory =
  Factory.define<AssetReferenceMaterial>('assetReferenceMaterial')
    .sequence('id')
    .attr('details', () => faker.internet.url())
    .attr('baseline', () => faker.internet.url())
    .attr('emp', () => faker.internet.url());

export const AssetModeFactory = Factory.define<AssetMode>('assetMode')
  .sequence('id')
  .attr('name', () => faker.lorem.words(2))
  .attr('description', () => faker.lorem.words(5))
  .attr('custom', () => faker.datatype.boolean());

export const AssetPhaseFactory = Factory.define<AssetPhase>('assetPhase')
  .sequence('id')
  .attr('name', () => faker.lorem.words(2))
  .attr('description', () => faker.lorem.words(5))
  .attr('custom', () => faker.datatype.boolean());
