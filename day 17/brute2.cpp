#include <iostream>
#include <thread>
#include <vector>
#include <atomic>
#include <cmath>
#include <chrono>

// Example function for computation
void compute_range(uint64_t start, uint64_t end, std::atomic<uint64_t> &result)
{
    // std::cout << end << std::endl;
    uint64_t local_sum = 0;
    for (uint64_t a = start; a < end; ++a)
    {
        if (((((((a % 8) ^ 1) ^ 5) ^ (uint64_t)(a / pow(2, ((a % 8) ^ 1)))) % 8) == 2) &&
            (((((((uint64_t)(a / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, (((uint64_t)(a / pow(2, 3)) % 8) ^ 1)))) % 8) == 4) &&
            (((((((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, (((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 1) &&
            (((((((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 1) &&
            (((((((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 7) &&
            (((((((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 5) &&
            (((((((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 1) &&
            (((((((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 5) &&
            (((((((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 4) &&
            (((((((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 3) &&
            (((((((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 0) &&
            (((((((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 3) &&
            (((((((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 5) &&
            (((((((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 5) &&
            (((((((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 3) &&
            (((((((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)((uint64_t)(a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 0))
        {
            std::cout << "winner :" << a << std::endl;
            break;
        }
    }
}

int main()
{10000000000
    const uint64_t total_iterations = 128*10'000'000'000;
    const unsigned num_threads = std::thread::hardware_concurrency();
    const uint64_t iterations_per_thread = total_iterations / num_threads;

    std::atomic<uint64_t> result(0);
    std::vector<std::thread> threads;

    auto start_time = std::chrono::high_resolution_clock::now();

    // Launch threads
    for (unsigned t = 0; t < num_threads; ++t)
    {
        uint64_t start = t * iterations_per_thread;
        uint64_t end = (t == num_threads - 1) ? total_iterations : start + iterations_per_thread;
        threads.emplace_back(compute_range, start, end, std::ref(result));
    }

    // Join threads
    for (auto &thread : threads)
    {
        thread.join();
    }

    auto end_time = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> elapsed = end_time - start_time;

    std::cout << "Result: " << result << std::endl;
    std::cout << "Elapsed Time: " << elapsed.count() << " seconds" << std::endl;

    return 0;
}
