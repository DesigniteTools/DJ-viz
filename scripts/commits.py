# This script emits commit hashes of all commits of a repository in a file
import os
from pydriller import Repository
import sys

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: commits.py <repo path> <out file path>")
    else:
        repo_path = sys.argv[1]
        out_path = sys.argv[2]
        # ----
        with open(out_path, "w") as writer:
            for commit in Repository(repo_path).traverse_commits():
                writer.write(commit.hash + os.linesep)
