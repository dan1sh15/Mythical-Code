#include <iostream>
#include <vector>
#include <algorithm>

void findTriplets(std::vector<int>& arr, int n, int K) {
    std::sort(arr.begin(), arr.end());

    bool found = false;

    for (int i = 0; i < n - 2; i++) {
        // Skip duplicates
        if (i > 0 && arr[i] == arr[i - 1]) {
            continue;
        }

        int left = i + 1;
        int right = n - 1;

        while (left < right) {
            int sum = arr[i] + arr[left] + arr[right];

            if (sum == K) {
                std::cout << arr[i] << " " << arr[left] << " " << arr[right] << "\n";
                found = true;

                // Skip duplicates
                while (left < right && arr[left] == arr[left + 1]) left++;
                while (left < right && arr[right] == arr[right - 1]) right--;

                left++;
                right--;
            } else if (sum < K) {
                left++;
            } else {
                right--;
            }
        }
    }

    if (!found) {
        std::cout << "No triplets found\n";
    }
}

int main() {
    int T;
    std::cin >> T;

    while (T--) {
        int n, K;
        std::cin >> n >> K;
        std::vector<int> arr(n);

        for (int i = 0; i < n; i++) {
            std::cin >> arr[i];
        }

        findTriplets(arr, n, K);
    }

    return 0;
}
