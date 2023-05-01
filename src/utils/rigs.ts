import { RigTypeEnum } from 'api/schema';

export const RIG_TYPE_LABEL: Record<RigTypeEnum, string> = {
  [RigTypeEnum.JACKUP]: 'Jackup',
  [RigTypeEnum.SEMI]: 'Semi',
  [RigTypeEnum.DRILLSHIP]: 'Drillship',
};

export type EncodedRig = `${RigTypeEnum}/${number}`;

export const encodeRig = (rig: {
  type: RigTypeEnum;
  id: number;
}): EncodedRig => {
  return `${rig.type}/${rig.id}`;
};

export const decodeRig = (encodedRig: EncodedRig) => {
  const [type, id] = encodedRig.split('/');
  return {
    type: type as RigTypeEnum,
    id: Number(id),
  };
};
