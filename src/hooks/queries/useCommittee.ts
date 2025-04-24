
import { useCommitteeQuery } from "./committee/useCommitteeQuery";
import { useCommitteeMutations } from "./committee/useCommitteeMutations";
export type { CommitteeMember, CommitteeInsert } from "./types";

export function useCommittee() {
  const query = useCommitteeQuery();
  const mutations = useCommitteeMutations();

  return {
    query,
    ...mutations,
  };
}
