MBB:0004 
0x00007fafa075ca10:   b8 00 00 00 00                   mov    $0x0,%eax
0x00007fafa075ca15:   8b 4f 10                         mov    0x10(%rdi),%ecx
0x00007fafa075ca18:   ba 00 00 00 00                   mov    $0x0,%edx
0x00007fafa075ca1d:   3b d6                            cmp    %esi,%edx
0x00007fafa075ca1f:   0f 8c 08 00 00 00                jl     0x00007fafa075ca2d
0x00007fafa075ca25:   48 8b 14 25 0f 00 00 00          mov    0xf,%rdx
MBB:0005 
0x00007fafa075ca2d:   3b f1                            cmp    %ecx,%esi
0x00007fafa075ca2f:   0f 8d 12 00 00 00                jge    0x00007fafa075ca47
MBB:0006 
0x00007fafa075ca35:   8b 54 b7 18                      mov    0x18(%rdi,%rsi,4),%edx
0x00007fafa075ca39:   03 c2                            add    %edx,%eax
0x00007fafa075ca3b:   ba 01 00 00 00                   mov    $0x1,%edx
0x00007fafa075ca40:   03 f2                            add    %edx,%esi
0x00007fafa075ca42:   e9 e6 ff ff ff                   jmpq   0x00007fafa075ca2d
MBB:0007 
0x00007fafa075ca47:   c3                               retq   
