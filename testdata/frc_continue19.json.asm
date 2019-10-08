MBB:0098 
0x00007fafa075e728:   90                               nop
0x00007fafa075e729:   b8 00 00 00 00                   mov    $0x0,%eax
0x00007fafa075e72e:   8b 4f 10                         mov    0x10(%rdi),%ecx
MBB:0099 
0x00007fafa075e731:   3b c1                            cmp    %ecx,%eax
0x00007fafa075e733:   0f 8d 36 00 00 00                jge    0x00007fafa075e76f
MBB:0100 
0x00007fafa075e739:   8b d0                            mov    %eax,%edx
0x00007fafa075e73b:   44 8b c0                         mov    %eax,%r8d
0x00007fafa075e73e:   8b c2                            mov    %edx,%eax
0x00007fafa075e740:   99                               cltd   
0x00007fafa075e741:   f7 fe                            idiv   %esi
0x00007fafa075e743:   41 b9 00 00 00 00                mov    $0x0,%r9d
0x00007fafa075e749:   41 8b c0                         mov    %r8d,%eax
0x00007fafa075e74c:   41 3b d1                         cmp    %r9d,%edx
0x00007fafa075e74f:   0f 85 05 00 00 00                jne    0x00007fafa075e75a
MBB:0101 
0x00007fafa075e755:   e9 09 00 00 00                   jmpq   0x00007fafa075e763
MBB:0102 
0x00007fafa075e75a:   ba 00 00 00 00                   mov    $0x0,%edx
0x00007fafa075e75f:   89 54 87 18                      mov    %edx,0x18(%rdi,%rax,4)
MBB:0103 
0x00007fafa075e763:   ba 01 00 00 00                   mov    $0x1,%edx
0x00007fafa075e768:   03 c2                            add    %edx,%eax
0x00007fafa075e76a:   e9 c2 ff ff ff                   jmpq   0x00007fafa075e731
MBB:0104 
0x00007fafa075e76f:   c3                               retq   
