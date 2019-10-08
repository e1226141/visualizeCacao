MBB:0075 
0x00007fafa075e058:   90                               nop
0x00007fafa075e059:   8b 47 10                         mov    0x10(%rdi),%eax
0x00007fafa075e05c:   8b 4f 10                         mov    0x10(%rdi),%ecx
0x00007fafa075e05f:   3b c1                            cmp    %ecx,%eax
0x00007fafa075e061:   0f 82 08 00 00 00                jb     0x00007fafa075e06f
0x00007fafa075e067:   48 8b 04 25 02 00 00 00          mov    0x2,%rax
0x00007fafa075e06f:   8b 44 87 18                      mov    0x18(%rdi,%rax,4),%eax
0x00007fafa075e073:   c3                               retq   
