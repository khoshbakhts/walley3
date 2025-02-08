import { WallData } from '../../hooks/useWallContract';

export interface PaintingRequestCardProps {
  wall: WallData;
  onSubmitCompletion?: () => Promise<void>;
  onApprove?: () => Promise<void>;
  onReject?: () => Promise<void>;
  showSubmitButton?: boolean;
  showApproveReject?: boolean;
  isLoading?: boolean;
}

export interface PendingRequestsListProps {
  loading: boolean;
  walls: WallData[];
  onSubmitCompletion: (wallId: number) => Promise<void>;
}

export interface AcceptedRequestsListProps {
  loading: boolean;
  walls: WallData[];
  onSubmitCompletion: (wallId: number) => Promise<void>;
}