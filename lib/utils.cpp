#include <iostream>
#include <vector>
#include <string>
#include <cmath>
#include <queue>
#include <unordered_map>

using namespace std;
typedef struct
{
    int x;
    int y;
} Point;

vector<Point> neighbors(Point p)
{
    return {
        {p.y - 1, p.x},
        {p.y + 1, p.x},
        {p.y, p.x - 1},
        {p.y, p.x + 1},
    };
}
float manhattan(Point s, Point e)
{
    return abs(s.x - e.x) + abs(s.y - e.y);
}

class Matrix
{
    vector<string> data;

public:
    int height = 0;
    int width = 0;
    Matrix(istream &in)
    {
        string row;
        while (getline(in, row))
        {
            data.push_back(row);
            width = row.size();
        }
        height = data.size();
    }

    void print()
    {
        for (auto &row : data)
        {
            for (char &sym : row)
            {
                cout << sym;
            }
            cout << endl;
        }
    }
    Point find(char c)
    {
        for (int i = 0; i < height; i++)
        {
            for (int j = 0; j < width; j++)
            {
                if (data[i][j] == c)
                    return {i, j};
            }
        }
        return {-1, -1};
    }
    bool in_bounds(Point p) const
    {
        return 0 <= p.x && p.x < width && 0 <= p.y && p.y < height;
    }
    string &operator[](size_t index)
    {
        if (index >= height)
        {
            throw std::out_of_range("Index out of range");
        }
        return data[index];
    }
    char &operator()(int row, int col)
    {
        if (row < 0 || row >= height || col < 0 || col >= width)
        {
            throw std::out_of_range("Index out of bounds");
        }
        return data[row][col];
    }
    char &operator[](Point p)
    {
        if (p.y < 0 || p.y >= height || p.x < 0 || p.x >= width)
        {
            throw std::out_of_range("Index out of bounds");
        }
        return data[p.y][p.x];
    }
    char &operator()(Point p)
    {
        if (p.y < 0 || p.y >= height || p.x < 0 || p.x >= width)
        {
            throw std::out_of_range("Index out of bounds");
        }
        return data[p.y][p.x];
    }
};