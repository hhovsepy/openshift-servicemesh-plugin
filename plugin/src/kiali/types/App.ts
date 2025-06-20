import { Namespace } from './Namespace';
import { Runtime, WaypointInfo } from './Workload';
import { InstanceType } from 'types/Common';
import { AppHealthResponse } from '../types/Health';
import { GroupVersionKind } from './IstioObjects';

export type AppId = {
  app: string;
  cluster?: string;
  namespace: string;
};

export interface AppWorkload {
  gvk: GroupVersionKind;
  isAmbient: boolean;
  isGateway: boolean;
  isWaypoint: boolean;
  isZtunnel: boolean;
  istioSidecar: boolean;
  labels: { [key: string]: string };
  namespace: string;
  serviceAccountNames: string[];
  waypointWorkloads?: WaypointInfo[];
  workloadName: string;
}

export interface App {
  cluster?: string;
  health: AppHealthResponse;
  instanceType: InstanceType.App;
  isAmbient: boolean;
  name: string;
  namespace: Namespace;
  runtimes: Runtime[];
  serviceNames: string[];
  workloads: AppWorkload[];
}

export interface AppQuery {
  health: 'true' | 'false';
  rateInterval: string;
}
