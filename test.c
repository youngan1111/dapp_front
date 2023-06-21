#include "types.h"
#include "stat.h"
#include "user.h"
#include "fcntl.h"

int main(int argc, char *argv[])
{
    int fd, i, j;
    char data[512];
    char buffer[512];

    fd = open("largefile", O_CREATE | O_WRONLY);
    if (fd < 0)
    {
        printf(2, "largefile: cannot open file for writing\n");
        exit();
    }

    // Write a large amount of data to the file
    for (i = 0; i < 2 * 1024 * 1024; i++)
    { // Change this value based on your maximum file size
        for (j = 0; j < sizeof(data); j++)
        {
            data[j] = i % 256; // Each block will be filled with a different byte value
        }
        if (write(fd, data, sizeof(data)) != sizeof(data))
        {
            printf(2, "largefile: write error\n");
            exit();
        }
    }

    close(fd);

    fd = open("largefile", O_RDONLY);
    if (fd < 0)
    {
        printf(2, "largefile: cannot open file for reading\n");
        exit();
    }

    // Read back the data and check that it's correct
    for (i = 0; i < 2 * 1024 * 1024; i++)
    { // Change this value based on your maximum file size
        if (read(fd, buffer, sizeof(buffer)) != sizeof(buffer))
        {
            printf(2, "largefile: read error\n");
            exit();
        }
        for (j = 0; j < sizeof(buffer); j++)
        {
            if (buffer[j] != i % 256)
            {
                printf(2, "largefile: data mismatch at offset %d, expected %d, got %d\n", i * sizeof(buffer) + j, i % 256, buffer[j]);
                exit();
            }
        }
    }

    printf(1, "largefile test passed\n");
    close(fd);
    exit();
}
