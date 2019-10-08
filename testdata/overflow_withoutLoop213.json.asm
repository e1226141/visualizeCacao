MBB:0069 
0x00007fafa075df88:   b8 00 00 00 00                   mov    $0x0,%eax
0x00007fafa075df8d:   8b 4f 10                         mov    0x10(%rdi),%ecx
0x00007fafa075df90:   3b c8                            cmp    %eax,%ecx
0x00007fafa075df92:   0f 8c 05 00 00 00                jl     0x00007fafa075df9d
0x00007fafa075df98:   e9 05 00 00 00                   jmpq   0x00007fafa075dfa2
MBB:0073 
0x00007fafa075df9d:   e9 16 00 00 00                   jmpq   0x00007fafa075dfb8
MBB:0070 
0x00007fafa075dfa2:   b8 64 00 00 00                   mov    $0x64,%eax
0x00007fafa075dfa7:   8b d1                            mov    %ecx,%edx
0x00007fafa075dfa9:   03 d0                            add    %eax,%edx
0x00007fafa075dfab:   3b d1                            cmp    %ecx,%edx
0x00007fafa075dfad:   0f 8d 05 00 00 00                jge    0x00007fafa075dfb8
0x00007fafa075dfb3:   e9 06 00 00 00                   jmpq   0x00007fafa075dfbe
MBB:0074 
MBB:0071 
0x00007fafa075dfb8:   b8 ff ff ff ff                   mov    $0xffffffff,%eax
0x00007fafa075dfbd:   c3                               retq   
MBB:0072 
0x00007fafa075dfbe:   8b 47 10                         mov    0x10(%rdi),%eax
0x00007fafa075dfc1:   3b d0                            cmp    %eax,%edx
0x00007fafa075dfc3:   0f 82 08 00 00 00                jb     0x00007fafa075dfd1
0x00007fafa075dfc9:   48 8b 14 25 02 00 00 00          mov    0x2,%rdx
0x00007fafa075dfd1:   8b 44 97 18                      mov    0x18(%rdi,%rdx,4),%eax
0x00007fafa075dfd5:   c3                               retq   
